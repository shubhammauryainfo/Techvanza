// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

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
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "auth-key"],
  })
);

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", apiKeyMiddleware);

const formRoutes = require("./routes/formRoutes");
app.use("/api/forms", formRoutes);



// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
