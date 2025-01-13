import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Allmeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/allmeals");
        setData(response.data.meals);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [data]);

  const deleteMeal = async (ele) => {
    const id = ele._id;
    try {
      await axios.post("http://localhost:5000/api/deleteMeal", { id });
      setData((prev) => prev.filter((pre) => pre._id !== id));
      toast.success(`${ele.meal} Deleted Successfully!`);
    } catch (err) {
      console.error(err);
      toast.error(`Error Deleting ${ele.meal}`);
    }
  };

  return (
    <div className="min-h-screen py-8 flex items-center justify-center gap-12 flex-col bg-gray-700">
      {data.length > 0 ? (
        data.map((ele, index) => (
          <div
            key={index}
            className="container min-h-20 w-[20rem] bg-purple-400 rounded-3xl p-4 flex items-center justify-between"
          >
            <div>
              <h1>{`Meal : ${ele.meal}`}</h1>
              <h1>{`Calories : ${ele.calories}`}</h1>
            </div>
            <div onClick={() => deleteMeal(ele)}>
              <MdDelete size={40} />
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-white">No meals found</h1>
      )}
    </div>
  );
};

export default Allmeals;
