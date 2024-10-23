import React, { useEffect, useState } from "react";
import axios from "axios";

const tracker = () => {
  const [data, setdata] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cal-tracker.onrender.com/api/planner"
        );
        console.log(response);
        setdata(response.data.meals);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen py-8 flex items-center justify-center flex-col gap-12 bg-gray-700">
      {data &&
        data.map((ele) => {
          return (
            <div className="container min-h-20 w-[20rem] bg-purple-400 rounded-3xl p-4">
              <h1>{`Type : ${ele.type}`}</h1>
              {ele.type === "meal" ? (
                <h1>{`Meal Name : ${ele.meal}`}</h1>
              ) : (
                <h1>{`Litres : ${ele.litres}`}</h1>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default tracker;
