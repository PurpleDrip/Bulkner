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

app.post("/api/deletePlanner", async (req, res) => {
  const { id } = req.body;
  try {
    const planner = await Planner.findByIdAndDelete(id);

    if (!planner) {
      return res.status(404).json({ message: "Planner not found" });
    }
    return res.status(200).json({ message: "Planner deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/deleteMeal", async (req, res) => {
  const { id } = req.body;
  try {
    const meal = await Meal.findByIdAndDelete(id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    return res.status(200).json({ message: "Meal deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

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
