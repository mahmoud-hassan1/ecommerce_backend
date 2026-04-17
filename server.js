import express from "express";
import { connectDB } from "./config/dbConfig.js";
import dotenv from "dotenv";
import mainRouter from "./routes/index.js";
import dns from "node:dns/promises";
import errorHandler from "./middleware/errorHandler.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import logger from "./middleware/logger.js";
import rateLimiter from "./middleware/rateLimiter.js";
dns.setServers(["1.1.1.1", "8.8.8.8"])
dotenv.config();

const app = express();
app.use(rateLimiter);
app.use(express.json());
app.use(logger);
app.use("/",mainRouter);
app.use(notFoundHandler);
app.use(errorHandler);
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.log("Error starting server", err);
});

