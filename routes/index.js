import express from "express";
import userRoutes from "./userRoutes.js";
import orderRoutes from "./orderRoutes.js";

const router = express.Router();
router.use("/auth", userRoutes);
router.use("/orders", orderRoutes);

export default router;
