import axios from "axios";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddWater = () => {
  const [value, setValue] = useState();
  const [customValue, setCustomValue] = useState("");

  const submitHandler = async (val) => {
    try {
      const response = await axios.post(
        "https://cal-tracker.onrender.com/api/createPlanner",
        {
          type: "water",
          litres: val,
        }
      );
      toast.success("Water added successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to add water", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const handleSubmit = () => {
    if (!value) {
      toast.warn("Select or Enter a value", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    submitHandler(value);
    setValue("");
    setCustomValue("");
  };

  return (
    <div className="h-[25rem] w-[22rem] border-2 border-indigo-400 rounded-3xl flex items-center justify-center flex-col gap-8">
      <div className="flex gap-4">
        <button
          className="box h-24 w-24 bg-black rounded-3xl text-xl font-bold text-indigo-400"
          onClick={() => setValue(0.25)}
        >
          1 CUP
        </button>
        <button
          className="box h-24 w-24 bg-black rounded-3xl text-xl font-bold text-indigo-400"
          onClick={() => setValue(0.5)}
        >
          2 CUP'S
        </button>
        <button
          className="box h-24 w-24 bg-black rounded-3xl text-xl font-bold text-indigo-400"
          onClick={() => setValue(0.75)}
        >
          3 CUP'S
        </button>
      </div>
      <input
        type="number"
        className="outline-none h-12 pl-4 rounded-xl"
        placeholder="in Liters"
        value={value}
        onChange={(e) => {
          setCustomValue(e.target.value);
          setValue(parseFloat(e.target.value));
        }}
      />
      <button
        className="h-12 w-28 bg-black text-white rounded-3xl"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default AddWater;
