const mongoose = require("mongoose");
const { Schema } = mongoose;

const mealSchema = new Schema(
  {
    meal: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

mealSchema.index({ meal: 1 }, { unique: true });

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
