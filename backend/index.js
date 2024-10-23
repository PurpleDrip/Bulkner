const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const {
  isExisting,
  addMeal,
  isValid,
  addingMeal,
  calculate,
  reset,
} = require("./Handlers");
const Meal = require("./Models/mealModel");
const Planner = require("./Models/plannerModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.post("/api/addMeal", isExisting, addMeal);
app.post("/api/createPlanner", isValid, addingMeal);
app.get("/api/getCount", calculate);
app.get("/api/reset", reset);

app.get("/api/allmeals", async (req, res) => {
  try {
    const meals = await Meal.find();
    return res.status(200).json({ meals });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/planner", async (req, res) => {
  try {
    const meals = await Planner.find();
    return res.status(200).json({ meals });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log("Listening on port:", port));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
