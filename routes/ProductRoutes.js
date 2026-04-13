import express from "express";
import { createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct} from "../controllers/ProductController.js";
const router = express.Router();
router.post('/',createProduct)
router.get('/',getAllProducts)

router.get('/:id',getProductById)
router.delete('/:id',deleteProduct);
router.patch('/:id' ,updateProduct);
export default router;