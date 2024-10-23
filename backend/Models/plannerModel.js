const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const plannerSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["meal", "water"],
    },
    meal: {
      type: String,
      required: function () {
        return this.type === "meal";
      },
    },
    litres: {
      type: Number,
      default: 0,
      required: function () {
        return this.type === "water";
      },
    },
  },
  { timestamps: true }
);

plannerSchema.index({ type: 1 });

const Planner = model("Planner", plannerSchema);
module.exports = Planner;
