import Order from "../models/Order.js";
import {buildOrderItemsFromRequest,decreaseProductStockForOrder} from "../utils/order.helpers.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Customer from "../models/Customer.js";

export const createOrder = async (req, res) => {
  try {
    
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

    const order = await Order.create({
      customer,
      items,
      totalAmount,
      paymentMethod,
      shippingAddress,
      customerName,
      customerEmail,
      customerPhone,
    });

    await decreaseProductStockForOrder(items);
    
    return res.status(201).json({
        success: true,
        data: order,
        message: "Order created successfully"
    });
  } catch (err) {
    throw new ApiError(400, err.message);
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("customer")
      .populate("items.product");
    
    return res.status(200).json({
        success: true,
        data: orders,
        message: "Orders retrieved successfully"
    });
  } catch (err) {
    throw new ApiError(500, err.message);
  }
};


export const getOrdersByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    
    const customerExists = await Customer.findById(customerId);

    if (!customerExists) {
        throw new ApiError(404, "Customer not found");
    }

    const orders = await Order.find({ customer: customerId })
      .sort({ createdAt: -1 })
      .populate("items.product");

    return res.status(200).json({
        success: true,
        data: orders,
        message: "Customer orders retrieved successfully"
    });
  } catch (err) {
    throw new ApiError(500, err.message);
  }
};

export const countOrders = async (req, res) => {
  try {
    const count = await Order.countDocuments();

    return res.status(200).json({
        success: true,
        data: { count },
        message: "Total orders counted successfully"
    })
  } catch (err) {
    throw new ApiError(500, err.message);
  }
};

export const countOrdersByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const count = await Order.countDocuments({ customer: customerId });

    return res.status(200).json({
        success: true,
        data: { customerId, count },
        message: "Orders counted successfully"
    });
  } catch (err) {
    throw new ApiError(500, err.message);
  }
};


export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("customer")
      .populate("items.product");

    if (!updatedOrder) {
      throw new ApiError(404, "Order not found");
    }
    return res.status(200).json({
        success: true,
        data: updatedOrder,
        message: "Order updated successfully"
    });
  } catch (err) {
    throw new ApiError(400, err.message);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return res.status(200).json({
        success: true,
        data: order,
        message: "Order deleted successfully"
    });
  } catch (err) {
    throw new ApiError(500, err.message);
  }
};
