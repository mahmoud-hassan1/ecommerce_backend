import User from "../models/Customer.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
export const getUsers = async (req, res) => {
    const page = Number(req.query.page) || undefined;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    let users = null;
    let totalProducts = null;
    if(page){
      
        users = await User.find().skip(skip).limit(limit);
    }
    else{
        users = await User.find();
    }
    if(!users){
        users = [];
    }
    totalProducts = await User.countDocuments();
    let totalPages = Math.ceil(totalProducts / limit);
    return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully",totalProducts,page,limit,totalPages));
}
export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
}
export const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    if(!user){
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
}
export const getUserInfo = async (req, res) => {
    const user = await User.findById(req.user.id);
    return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
}