import express from "express";
import userRoutes from "./auth.js";
import orderRoutes from "./orderRoutes.js";
import ProductRoutes from "./ProductRoutes.js"
import categoryRoutes from "./categoryRouts.js";
const router = express.Router();
router.use("/auth", userRoutes);
router.use("/products",ProductRoutes);
router.use("/orders", orderRoutes);
router.use("/categories", categoryRoutes);
export default router;
