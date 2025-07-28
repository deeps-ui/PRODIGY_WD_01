const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");

dotenv.config(); // Load environment variables from .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Serve HTML files (like register.html, login.html)
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/auth", authRoutes);

// Test route (optional)
app.get("/", (req, res) => {
  res.send("✅ Secure Auth API running");
});

// MongoDB Connection
const uri = process.env.MONGO_URI;
console.log("MONGO_URI from .env:", uri);

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
