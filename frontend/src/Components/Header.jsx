import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import RegisterMeal from "./RegisterMeal";

const Header = () => {
  const [showForm, setshowForm] = useState(false);
  return (
    <>
      <div className="h-16 bg-indigo-400 mx-8 mt-3 rounded-3xl box-border flex items-center justify-between px-8">
        <h1 className="text-3xl text-white main-header">Calorie Tracker</h1>
        <div className="links gap-8 flex text-xl">
          <NavLink to="/tracker">Tracker</NavLink>
          <NavLink to="/all-meals">All Meals</NavLink>
          <button onClick={() => setshowForm((prev) => !prev)}>
            Register Meal
          </button>
        </div>
      </div>
      {showForm && <RegisterMeal setshowForm={setshowForm} />}
    </>
  );
};

export default Header;
