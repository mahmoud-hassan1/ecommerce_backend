import express from "express";
import { connectDB } from "./config/dbConfig.js";
import dotenv from "dotenv";
import mainRouter from "./routes/index.js";
dotenv.config();
connectDB();
const app = express();

app.use("/",mainRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

