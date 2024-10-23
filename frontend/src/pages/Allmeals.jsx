import React, { useEffect, useState } from "react";
import axios from "axios";

const Allmeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cal-tracker.onrender.com/api/allmeals"
        );
        setData(response.data.meals);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen py-8 flex items-center justify-center gap-12 flex-col bg-gray-700">
      {data.length > 0 ? (
        data.map((ele, index) => (
          <div
            key={index}
            className="container min-h-20 w-[20rem] bg-purple-400 rounded-3xl p-4"
          >
            <h1>{`Meal : ${ele.meal}`}</h1>
            <h1>{`Calories : ${ele.calories}`}</h1>
          </div>
        ))
      ) : (
        <h1 className="text-white">No meals found</h1>
      )}
    </div>
  );
};

export default Allmeals;
