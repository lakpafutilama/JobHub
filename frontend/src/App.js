import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./Components/HomePage/Home";
import EmployerDashboard from "./Components/Dashboard/EmployerDashboard";
import SearchJob from "./Components/Dashboard/SearchJob";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<EmployerDashboard />} />
        <Route path="/search" element={<SearchJob />} />
      </Routes>
    </Router>
  );
}

export default App;
