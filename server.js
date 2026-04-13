import express from "express";
import { connectDB } from "./config/dbConfig.js";
import dotenv from "dotenv";
import mainRouter from "./routes/index.js";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"])
dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use("/",mainRouter);
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    ...err
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

