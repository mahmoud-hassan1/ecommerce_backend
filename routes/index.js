import express from "express";
import authRoutes from "./auth.js";
import orderRoutes from "./orderRoutes.js";
import ProductRoutes from "./ProductRoutes.js"
import categoryRoutes from "./categoryRouts.js";
import userRoutes from "./users.js";
const router = express.Router();
router.use("/auth", authRoutes);
router.use("/products",ProductRoutes);
router.use("/orders", orderRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);
export default router;
