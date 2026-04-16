import express from "express";
import { createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct} from "../controllers/ProductController.js";
import authMiddleware from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', authMiddleware, authorize('ADMIN'), createProduct);
router.patch('/:id', authMiddleware, authorize('ADMIN'), updateProduct);
router.delete('/:id', authMiddleware, authorize('ADMIN'), deleteProduct);

export default router;
