import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    role: "User",
    dob: "",
    password: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/signup", formData)
      .then((res) => {
        document.cookie = res.data.data;
        window.location = "http://localhost:3000/dashboard";
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDropdownChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      role: value,
    });
  };

  return (
    <div id="signupform">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          placeholder="Enter your full name"
          name="full_name"
          value={formData.full_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <label>Date of Birth: </label>
        <input
          type="date"
          placeholder="Date of Birth"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />
        <label>Signup as: </label>
        <div className="role-container">
          <select
            id="selectedOption"
            name="role"
            value={formData.role}
            onChange={handleDropdownChange}
            required
          >
            <option value="User">User</option>
            <option value="Organization">Organization</option>
          </select>
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
