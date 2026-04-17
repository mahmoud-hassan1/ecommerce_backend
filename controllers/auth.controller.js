import ApiError from "../utils/ApiError.js";
import User from "../models/Customer.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";
const getToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN });
}

export const createUser = async (req, res) => {
        const { username, email, password, role , name, phone} = req.body;
        if(username && email && password ){
            const existingUserWithUsername = await User.findOne({ username });
            const existingUserWithEmail = await User.findOne({ email });
            if(existingUserWithUsername){
                throw new ApiError(409, "username already exists");
            }   
            if(existingUserWithEmail){
                throw new ApiError(409, "email already exists");
            }
            const user = await User.create({ username, email, password, role , name, phone});
            user.password = undefined;
            const token = getToken(user);
            return res.status(201).json(new ApiResponse(201, {user, token}, "User created successfully"));
        }
        else{
            throw new ApiError(400, "Username, email and password are required");
        }
}

export const loginUser = async (req, res) => {
    const { email,username, password } = req.body;
    if(!(email || username) && !password){
        throw new ApiError(400, "Email, username and password are required");

    }
    let user = null;
    if(email){
        user = await User.findOne({ email }).select('+password');
    }
    else if(username){
        user = await User.findOne({ username }).select('+password');
    }
    if(!user){
        throw new ApiError(401, "Invalid Credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid Credentials");
    }
    const token = getToken(user);
    user.password = undefined;
    return res.status(200).json(new ApiResponse(200, {user, token}, "Login successful"));
}