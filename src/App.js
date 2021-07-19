import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import CheckIn from "./pages/CheckIn";

function App() {
  return (
    <>
      <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden">
        <NavBar />
        <div className="">
          <Router>
            <CheckIn />
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
