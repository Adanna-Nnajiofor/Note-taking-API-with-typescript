import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import noteRoutes from "./routes/noteRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import { loggerMiddleware } from "./middleware/loggerMiddleware";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/api/notes", noteRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

// Global Error Handler (Must be after routes)
app.use(errorHandler);
