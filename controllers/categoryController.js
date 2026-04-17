import Category from '../models/Category.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = await Category.create({ name, slug });

    return res.status(201).json(new ApiResponse(201, category, "Category created successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Failed to create category");
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Failed to fetch categories");
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    return res.status(200).json(new ApiResponse(200, category, "Category fetched successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Failed to fetch category");
  }
};

export const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;
    const category = await Category.findByIdAndUpdate(id, { name, slug }, { returnDocument: "after" });
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    return res.status(200).json(new ApiResponse(200, category, "Category updated successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Failed to update category");
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    return res.status(200).json(new ApiResponse(200, category, "Category deleted successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Failed to delete category");
  }
};

