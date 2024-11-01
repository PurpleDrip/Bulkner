import React, { useEffect, useState } from "react";
import AddMeal from "./AddMeal";
import AddWater from "./AddWater";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hero = () => {
  const [caloriesCount, setCaloriesCount] = useState(0);
  const [totalCal, setTotalCal] = useState(3000); // Total daily calorie goal
  const [waterCount, setWaterCount] = useState(0);
  const [totalWater, setTotalWater] = useState(3); // Total daily water goal in liters
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://cal-tracker.onrender.com/api/getCount"
      );
      setCaloriesCount(response.data.totalCalorie);
      setWaterCount(response.data.totalLitre);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-5xl text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="h-[83vh] flex items-center justify-center gap-16">
      <button
        className="absolute right-[3rem] top-[7rem] h-12 w-28 bg-indigo-400 border-[3.5px] text-white rounded-3xl border-black"
        onClick={async () => {
          try {
            await axios.get("https://cal-tracker.onrender.com/api/reset");
            fetchData(); // Update counts after reset
            toast.success("Reset successful");
          } catch (err) {
            console.log(err);
            toast.error("Failed to reset");
          }
        }}
      >
        Reset
      </button>
      <AddMeal setCaloriesCount={setCaloriesCount} />
      <AddWater setWaterCount={setWaterCount} />
      <p className="absolute bottom-[7rem] text-3xl text-white">{`Calories Eaten: ${caloriesCount} kCal, Remaining: ${
        totalCal - caloriesCount
      } kCal`}</p>
      <p className="absolute bottom-[4rem] text-3xl text-white">{`Water intake: ${waterCount} Liters, Remaining: ${
        totalWater - waterCount
      } Liters`}</p>
    </div>
  );
};

export default Hero;
