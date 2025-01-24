// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');
const fs = require("fs");
dotenv.config();

const apiKeys = [process.env.API_KEY];

const app = express();

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["auth-key"]; // Get API key from request headers

  if (!apiKey || !apiKeys.includes(apiKey)) {
    return res.status(403).json({
      warning: "Forbidden: please enter correct Api Key :)",
    });
  }

  next(); // Proceed to the next middleware or route handler
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "auth-key"],
  })
);

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve static files from the uploads folder
app.use("/uploads", express.static(uploadDir));
// Routes
app.use("/api", apiKeyMiddleware);

const formRoutes = require("./routes/formRoutes");
app.use("/api/forms", formRoutes);
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
const uploadRoutes = require('./routes/uploadRoutes');
app.use("/upload", uploadRoutes);



// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
