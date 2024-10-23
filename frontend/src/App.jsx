import React from "react";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Allmeals from "./pages/Allmeals";
import Tracker from "./pages/Tracker";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen max-w-full bg-gray-700 overflow-x-hidden">
                <Header />
                <Hero />
              </div>
            }
          />
          <Route path="/all-meals" element={<Allmeals />} />
          <Route path="/tracker" element={<Tracker />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
