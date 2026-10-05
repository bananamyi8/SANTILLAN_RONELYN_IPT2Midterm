const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const violationRoutes = require("./routes/violations");

const app = express();
const PORT = process.env.PORT || 5000;

// Allows the React frontend to communicate with the API.
app.use(cors());

// Allows Express to receive JSON request data.
app.use(express.json());

// Connect the backend to MongoDB.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });

// Student violation REST API.
app.use("/api/violations", violationRoutes);

// Simple server test route.
app.get("/", (req, res) => {
  res.json({
    message: "Student Violation Record API is running."
  });
});

// Start the Express server.
app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});