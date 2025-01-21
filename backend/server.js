import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";

import { connectDB } from "./config/db.js"; // Ensure this function is correct
import productRoutes from "./routes/product.route.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow only the frontend to access the backend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  credentials: true, // Enable cookies and authentication headers
}));


app.use(express.json()); // Allows JSON data in req.body

// API Routes
app.use("/api/products", productRoutes);

// Serve Static Files (for Production)
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}



  app.listen(PORT, '0.0.0.0', () => {
	connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
  });



