import React, { useEffect, useState } from "react";
import axios from "axios";

const Tracker = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cal-tracker.onrender.com/api/planner"
        );
        console.log(response);
        setData(response.data.meals);
        console.log(data.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen py-8 flex items-center justify-center flex-col gap-12 bg-gray-700">
      {loading ? (
        <h1 className="text-5xl text-white">Loading...</h1>
      ) : data.length === 0 ? (
        <h1 className="text-5xl text-white">No data was added yet</h1>
      ) : (
        data.map((ele, index) => (
          <div
            key={index}
            className="container min-h-20 w-[20rem] bg-purple-400 rounded-3xl p-4"
          >
            <h1>{`Type: ${ele.type}`}</h1>
            {ele.type === "meal" ? (
              <h1>{`Meal Name: ${ele.meal}`}</h1>
            ) : (
              <h1>{`Litres: ${ele.litres}`}</h1>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Tracker;
