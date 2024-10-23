import axios from "axios";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMeal = () => {
  const [meal, setMeal] = useState("");
  const [data, setData] = useState("");

  const mealValidate = async (mealName) => {
    try {
      const response = await axios.post(
        "https://cal-tracker.onrender.com/api/createPlanner",
        { type: "meal", meal: mealName }
      );
      console.log(response);
      setData(response.data);
      toast.success("Meal added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        toast.error("Meal does not exist in database", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error("Failed to add meal!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!meal) {
      toast.warn("Enter meal name before adding", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    mealValidate(meal.toLowerCase());
    setMeal(""); // Clear the input field after submission
  };

  return (
    <div className="h-[25rem] w-[22rem] border-2 border-indigo-400 rounded-3xl flex items-center justify-center">
      <form
        className="flex items-center justify-center flex-col gap-[2rem]"
        name="meal-adder-form"
        onSubmit={handleSubmit}
      >
        <h1 className="text-5xl font-bold text-indigo-200">Add Your Meal</h1>
        <input
          type="text"
          value={meal}
          placeholder="Meal Name"
          className="h-[3rem] w-[16rem] rounded-2xl pl-4 outline-none"
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
