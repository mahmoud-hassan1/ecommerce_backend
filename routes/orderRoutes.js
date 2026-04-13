import express from "express";

import {
  createOrder,
  getAllOrders,
  getOrdersByCustomerId,
  countOrders,
  countOrdersByCustomer,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/customer/:customerId", getOrdersByCustomerId);
router.get("/count", countOrders);
router.get("/count/:customerId", countOrdersByCustomer);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;