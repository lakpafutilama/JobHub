import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./Components/HomePage/Home";
import Signin from "./Components/SigninForm/Signin";
import Signup from "./Components/SignupForm/Signup";
import EmployerDashboard from "./Components/Dashboard/EmployerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<EmployerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
