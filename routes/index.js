import express from "express";
import userRoutes from "./auth.js";
import orderRoutes from "./orderRoutes.js";

const router = express.Router();
router.use("/auth", userRoutes);
router.use("/orders", orderRoutes);
import authRoutes from "./auth.js";

const router = express.Router();
router.use("/auth", authRoutes);

export default router;
