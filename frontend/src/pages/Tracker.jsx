import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Tracker = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/planner");
        setData(response.data.meals);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [data]);

  const deletePlanner = async (ele) => {
    const id = ele._id;
    try {
      await axios.post("http://localhost:5000/api/deletePlanner", { id });
      setData((prev) => prev.filter((pre) => pre._id !== id));
      if (ele.type === "water") {
        toast.success(`${ele.litres} litre(s) water removed.`);
      } else if (ele.type === "meal") {
        toast.success(`${ele.meal} removed successfully!`);
      } else {
        toast.success("Meal added successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error Deleting an Item!");
    }
  };

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
            className="container min-h-20 w-[20rem] bg-purple-400 rounded-3xl p-4 flex items-center justify-between"
          >
            <div>
              <h1>{`Type: ${ele.type}`}</h1>
              {ele.type === "meal" ? (
                <h1>{`Meal Name: ${ele.meal}`}</h1>
              ) : (
                <h1>{`Litres: ${ele.litres}`}</h1>
              )}
            </div>
            <div onClick={() => deletePlanner(ele)}>
              <MdDelete size={40} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Tracker;
