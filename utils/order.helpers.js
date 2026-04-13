import ApiError from "./ApiError";
import Product from "../models/Product.js";

const normalizePaymentMethod = (method = "") => {
    const map = {
        cash: "CASH",
        card: "CARD",
        online: "ONLINE",
    };

    return map[String(method).toLowerCase()] || "CASH";
};

const normalizeOrderStatus = (status = "") => {
    const allowed = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
    const normalized = String(status).toUpperCase();
    return allowed.includes(normalized) ? normalized : "PENDING";
};

const buildOrderItemsFromRequest = async (orderItems = []) => {
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
        throw new ApiError(400, "orderItems must be a non-empty array");
    }

    const builtItems = [];

    for (const item of orderItems) {
        const { productId, quantity, size, selectedSize, status } = item;

        if (!productId) {
            throw new ApiError(400, "Each order item must contain productId");
        }

        const qty = Number(quantity);
        if (!qty || qty < 1) {
            throw new ApiError(400, "Each order item must contain a valid quantity");
        }

        const product = await Product.findById(productId).populate("category color");
        if (!product || !product.isActive) {
            throw new ApiError(404, `Product not found or inactive: ${productId}`);
        }

        const chosenSize = selectedSize || size || "";
        let availableStock = product.stock;

        if (chosenSize) {
            const matchedVariant = product.variants.find(
                (variant) => String(variant.size).toLowerCase() === String(chosenSize).toLowerCase()
            );

            if (!matchedVariant) {
                throw new ApiError(400, `Selected size "${chosenSize}" not found for product ${product.title}`);
            }

            availableStock = matchedVariant.stock;
        }

        if (availableStock < qty) {
            throw new ApiError(400, `Insufficient stock for product ${product.title}`);
        }

        builtItems.push({
            product: product._id,
            productTitle: product.title,
            productBrand: product.brand,
            selectedSize: chosenSize,
            quantity: qty,
            unitPrice: product.price,
            lineTotal: Number((product.price * qty).toFixed(2)),
            status: normalizeOrderStatus(status),
        });
    }

    return builtItems;
};

const decreaseProductStockForOrder = async (items = []) => {
    for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) continue;

        if (item.selectedSize) {
            const variant = product.variants.find(
                (v) => String(v.size).toLowerCase() === String(item.selectedSize).toLowerCase()
            );

            if (!variant || variant.stock < item.quantity) {
                throw new ApiError(400, `Insufficient stock for ${product.title} (${item.selectedSize})`);
            }

            variant.stock -= item.quantity;
        } else {
            if (product.stock < item.quantity) {
                throw new ApiError(400, `Insufficient stock for ${product.title}`);
            }

            product.stock -= item.quantity;
        }

        await product.save();
    }
};

module.exports = {
    normalizePaymentMethod,
    normalizeOrderStatus,
    buildOrderItemsFromRequest,
    decreaseProductStockForOrder,
};