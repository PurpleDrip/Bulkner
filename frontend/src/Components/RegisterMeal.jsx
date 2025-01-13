import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";

const RegisterMeal = ({ setshowForm }) => {
  const [meal, setMeal] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(meal);
    console.log(calories);
    axios
      .post("http://localhost:5000/api/addMeal", {
        meal,
        calories,
      })
      .then((response) => console.log(response))
      .then(() => toast.success("Registered Meal successful"))
      .catch((err) => {
        console.log(err);
        toast.error("Error Registering Meal");
      });
  };

  return (
    <div className="absolute h-[90vh] w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative border-2 border-indigo-400 h-[20rem] w-[18rem] bg-gray-700 rounded-3xl flex flex-col items-center justify-center gap-4"
      >
        <h1 className="text-4xl mb-4 font-bold text-indigo-400">
          Register Meal
        </h1>
        <input
          type="text"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
          className="px-4 py-2 rounded-xl"
          placeholder="Meal Name"
        />
        <input
          type="text"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="px-4 py-2 rounded-xl"
          placeholder="Calories Present"
        />
        <button className="px-8 py-2 bg-black text-white rounded-3xl ">
          Add
        </button>
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setshowForm((prev) => !prev)}
        >
          <IoIosCloseCircle size={25} color="red" />
        </div>
      </form>
    </div>
  );
};

export default RegisterMeal;
