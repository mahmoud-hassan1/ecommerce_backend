import express from "express";
import { createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct,
    getProductsByIds} from "../controllers/ProductController.js";
import authMiddleware from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.get('/', getAllProducts);
router.post('/get-products-by-ids',authMiddleware, getProductsByIds);
router.get('/:id', getProductById);

router.post('/', authMiddleware, authorize('ADMIN'), createProduct);
router.patch('/:id', authMiddleware, authorize('ADMIN'), updateProduct);
router.delete('/:id', authMiddleware, authorize('ADMIN'), deleteProduct);
export default router;
