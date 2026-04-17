import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Log from "../models/Log.js";
const logger = async (req, res, next) => {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && req.originalUrl !== '/auth/login' && req.originalUrl !== '/auth/register') {
        res.on('finish', async () => {
            try {
                let user=null;
               if(req.user){
                user = req.user;
                user.iat=undefined;
                user.exp=undefined;

               }
               else{
                user = "Anonymous User";
               }
                await Log.create({
                    method: req.method,
                    url: req.originalUrl,
                    body: req.body,
                    message: res.send.message,
                    user: user,
                    statusCode: res.statusCode,
                    createdAt: new Date(),
                });
            } catch (loggingError) {
                console.error("Audit Log Error:", loggingError);
            }
        });
    }
    next();
};

export default logger;