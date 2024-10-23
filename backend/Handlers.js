const Meal = require("./Models/mealModel");
const Planner = require("./Models/plannerModel");

const isExisting = async (req, res, next) => {
  const meal = req.body.meal.toLowerCase();
  let existingMeal;
  try {
    existingMeal = await Meal.findOne({ meal });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (existingMeal) {
    return res.status(400).json({ message: "Meal already exists" });
  }
  next();
};

const addMeal = async (req, res) => {
  const meal = req.body.meal.toLowerCase();
  const calories = req.body.calories;
  let newMeal;
  try {
    newMeal = new Meal({ meal, calories });
    await newMeal.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res
    .status(201)
    .json({ message: "Successfully added a meal", data: newMeal });
};

const isValid = async (req, res, next) => {
  const type = req.body.type;
  if (type === "meal") {
    const { meal } = req.body;
    let existing;
    try {
      existing = await Meal.findOne({ meal });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!existing) {
      return res.status(400).json({ message: "Meal does not exist in db" });
    }
    req.body.calories = existing.calories;
    next();
  } else {
    next();
  }
};

const addingMeal = async (req, res, next) => {
  const { type, meal, calories, litres } = req.body;
  let newItem;

  try {
    newItem = new Planner({ type, meal, calories, litres });
    await newItem.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(201).json({ message: "Added item successfully" });
};

const calculate = async (req, res) => {
  try {
    const items = await Planner.find({});
    const meals = await Meal.find({
      meal: { $in: items.map((item) => item.meal) },
    });

    const mealMap = meals.reduce((acc, meal) => {
      acc[meal.meal] = meal.calories;
      return acc;
    }, {});

    let totalCalorie = 0;
    let totalLitre = 0;

    for (const ele of items) {
      if (ele.type === "meal") {
        const calories = mealMap[ele.meal];
        if (calories) {
          totalCalorie += calories;
        } else {
          console.warn("Meal not found:", ele.meal);
        }
      } else if (ele.type === "water") {
        totalLitre += ele.litres;
      } else {
        console.warn("Invalid type:", ele.type);
      }
    }

    return res.status(200).json({
      totalCalorie,
      totalLitre,
    });
  } catch (err) {
    console.error("Error calculating totals:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const reset = async (req, res) => {
  try {
    await Planner.deleteMany();
    return res.status(200).json({ message: "All items deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { isExisting, addMeal, isValid, addingMeal, calculate, reset };
