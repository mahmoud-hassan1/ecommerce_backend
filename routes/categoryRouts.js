import express from "express";
import authMiddleware from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
} from "../controllers/categoryController.js";
const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", authMiddleware, authorize(["ADMIN"]), createCategory);
router.patch("/:id", authMiddleware, authorize(["ADMIN"]), updateCategoryById);
router.delete("/:id", authMiddleware, authorize(["ADMIN"]), deleteCategoryById);

export default router;