import express from "express";
import userRoutes from "./auth.js";
import orderRoutes from "./orderRoutes.js";
import ProductRoutes from "./ProductRoutes.js"
const router = express.Router();
router.use("/auth", userRoutes);
router.use("/products",ProductRoutes);
router.use("/orders", orderRoutes);
export default router;
