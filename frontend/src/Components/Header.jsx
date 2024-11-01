import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="h-16 bg-indigo-400 mx-8 mt-3 rounded-3xl box-border flex items-center justify-between px-8">
      <h1 className="text-3xl text-white main-header">Calorie Tracker</h1>
      <div className="links gap-8 flex text-xl">
        <NavLink to="/tracker">Tracker</NavLink>
        <NavLink to="/all-meals">All Meals</NavLink>
      </div>
    </div>
  );
};

export default Header;
