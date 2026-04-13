import Product from "../models/Product.js";

export const createProduct =async (req, res, next)=>{
try {
        const product = await Product.create(req.body);
        res.status(201).json({ status: 'success', data: product });
    } catch (error) {
        next(error); 
    }
}

export const getAllProducts = async(req , res ,next ) =>{
    const products = await Product.find ();
    res.status(200).json({status: 'success' , data :products})
}