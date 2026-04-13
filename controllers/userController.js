import ApiError from "../utils/ApiError.js";
import User from "../models/Customer.js";
import ApiResponse from "../utils/ApiResponse.js";
export const createUser = async (req, res) => {
        const { username, email, password, role , name, phone} = req.body;
        if(username && email && password ){
            const existingUserWithUsername = await User.findOne({ username });
            const existingUserWithEmail = await User.findOne({ email });
            if(existingUserWithUsername){
                throw new ApiError(400, "username already exists");
            }
            if(existingUserWithEmail){
                throw new ApiError(400, "email already exists");
            }
            const user = await User.create({ username, email, password, role , name, phone});
            return ApiResponse(201, user, "User created successfully");
        }
        else{
            throw new ApiError(400, "Username, email and password are required");
        }
   
}