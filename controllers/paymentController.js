import Stripe from "stripe";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { buildOrderItemsFromRequest, decreaseProductStockForOrder } from "../utils/order.helpers.js";
import Order from "../models/Order.js";

export const createCheckoutSession = async (req, res) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const {
            customer,
            orderItems,
            paymentMethod,
            shippingAddress,
            customerName,
            customerEmail,
            customerPhone,
        } = req.body;

        const items = await buildOrderItemsFromRequest(orderItems);

        const totalAmount = items.reduce(
            (sum, item) => sum + item.lineTotal,
            0
        );


        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],

            line_items: items.map((item) => ({
                price_data: {
                    currency: "egp",
                    product_data: {
                        name: item.productTitle,
                    },
                    unit_amount: item.lineTotal * 100,
                },
                quantity: 1,
            })),

            metadata: {
                customer: customer || "",
                paymentMethod,
                shippingAddress,
                customerName,
                customerEmail,
                customerPhone,
                orderItems: JSON.stringify(orderItems),
            },

            success_url: `${process.env.CLIENT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/checkout`,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                { url: session.url },
                "Stripe checkout session created successfully"
            )
        );
    } catch (err) {
        throw new ApiError(500, err.message);
    }
};

export const verifyCheckoutSession = async (req, res) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const { sessionId } = req.params;

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
            throw new ApiError(400, "Payment is not completed yet");
        }

        const metadata = session.metadata;

        const orderItems = JSON.parse(metadata.orderItems);

        const items = await buildOrderItemsFromRequest(orderItems);

        const totalAmount = items.reduce(
            (sum, item) => sum + item.lineTotal,
            0
        );

        const order = await Order.create({
            customer: metadata.customer,
            items: items,
            totalAmount: totalAmount,
            paymentMethod: metadata.paymentMethod,
            shippingAddress: metadata.shippingAddress,
            customerName: metadata.customerName,
            customerEmail: metadata.customerEmail,
            customerPhone: metadata.customerPhone,
        });

        await decreaseProductStockForOrder(items);

        return res.status(201).json(
            new ApiResponse(
                201,
                {
                    sessionId: session.id,
                    paymentStatus: session.payment_status,
                    order: order,
                },
                "Payment verified and order created successfully"
            )
        );
    } catch (err) {
        throw new ApiError(500, err.message);
    }
};