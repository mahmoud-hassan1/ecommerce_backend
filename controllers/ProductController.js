import Product from "../models/Product.js";
import Category from "../models/Category.js";
import ApiResponse from "../utils/ApiResponse.js";
export const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            status: 'success',
            data: product
        });
    } catch (error) {
        error.statusCode = 400;
        error.success = false;
        next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
    try {
        const { search, sort } = req.query;
        const page = Number(req.query.page) || undefined;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        let totalProducts = null;
        let productsQuery = Product.find().populate("category");
        let searchQuery = {}; 
        if (search) {
            searchQuery = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ],
            };
            productsQuery = productsQuery.find(searchQuery);
            
        }
        if (sort) {
            const sortBy = sort.split(",").join(" ");
            productsQuery = productsQuery.sort(sortBy);
        }
        if (page) {
            productsQuery = productsQuery.skip(skip).limit(limit);
        }

        let products = await productsQuery;
        
        if (!products) {
            products = [];
        }
        totalProducts = await Product.countDocuments(searchQuery);
        let totalPages = Math.ceil(totalProducts / limit);
        return res.status(200).json(
            new ApiResponse(200, products, "Products fetched successfully", totalProducts, page, limit, totalPages)
        );

    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        
        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            error.success = false;
            return next(error);
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
            runValidators: true
        });

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            error.success = false;
            return next(error);
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            error.success = false;
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};