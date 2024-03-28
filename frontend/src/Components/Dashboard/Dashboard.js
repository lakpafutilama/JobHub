import React from "react";
import axios from "axios";

const Dashboard = () => {
  const handleAccess = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:9000/dashboard")
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  handleAccess();
  return <div>Dashboard</div>;
};

export default Dashboard;
