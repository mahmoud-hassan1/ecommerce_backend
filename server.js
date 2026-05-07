import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cors from "cors";
import { connectDB } from "./config/dbConfig.js";
import mainRouter from "./routes/index.js";
import dns from "node:dns/promises";
import errorHandler from "./middleware/errorHandler.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import logger from "./middleware/logger.js";
import rateLimiter from "./middleware/rateLimiter.js";
import Stripe from "stripe";
import paymentRoutes from "./routes/paymentRoutes.js";


dns.setServers(["1.1.1.1", "8.8.8.8"])
dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: "http://localhost:4200" }));
app.use(rateLimiter);
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use("/api/payments", paymentRoutes);

app.use(rateLimiter);
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

