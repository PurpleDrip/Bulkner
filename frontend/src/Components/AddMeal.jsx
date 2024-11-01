import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const AddMeal = ({ setCaloriesCount }) => {
  const [meal, setMeal] = useState("");
  const [data, setData] = useState("");

  const mealValidate = async (mealName) => {
    try {
      const response = await axios.post(
        "https://cal-tracker.onrender.com/api/createPlanner",
        { type: "meal", meal: mealName }
      );
      setData(response.data);

      // Update the calorie count immediately after adding the meal
      const countResponse = await axios.get(
        "https://cal-tracker.onrender.com/api/getCount"
      );
      setCaloriesCount(countResponse.data.totalCalorie);

      toast.success("Meal added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Meal not in database!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!meal) {
      toast.warn("Enter meal name before adding");
      return;
    }

    mealValidate(meal.toLowerCase());
    setMeal("");
  };

  return (
    <div className="h-[25rem] w-[22rem] border-2 border-indigo-400 rounded-3xl flex items-center justify-center box">
      <form
        className="flex items-center justify-center flex-col gap-[2rem]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-5xl font-bold text-indigo-200 add-meal-header">
          Add Your Meal
        </h1>
        <input
          type="text"
          value={meal}
          placeholder="Meal Name"
          className="h-[3rem] w-[16rem] rounded-2xl pl-4 outline-none get-value"
          onChange={(e) => setMeal(e.target.value)}
        />
        <button
          type="submit"
          className="h-12 w-28 bg-black text-white rounded-3xl"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddMeal;
