import express from "express";

import {
  createOrder,
  getAllOrders,
  getOrdersByCustomerId,
  countOrders,
  countOrdersByCustomer,
  updateOrder,
  deleteOrder,
  getMyOrders,
  countMyOrders
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.post("/", authMiddleware, authorize(["USER", "ADMIN"]), createOrder);

router.get("/", authMiddleware, authorize(["ADMIN"]), getAllOrders);
router.get("/my-orders",authMiddleware,authorize(["USER"]),getMyOrders);
router.get("/customer/:customerId",authMiddleware,authorize(["ADMIN"]),getOrdersByCustomerId);

router.get("/count", authMiddleware, authorize(["ADMIN"]), countOrders);
router.get("/count/:customerId",authMiddleware,authorize(["ADMIN"]),countOrdersByCustomer);
router.get("/my-orders/count", authMiddleware, authorize(["USER"]), countOrders);

router.patch("/:id", authMiddleware, authorize(["ADMIN"]), updateOrder);
router.delete("/:id", authMiddleware, authorize(["ADMIN"]), deleteOrder);

export default router;