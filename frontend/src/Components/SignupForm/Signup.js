import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [u_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const userDetails = {
      full_name: u_name,
      email,
      contact,
      gender,
      dob,
      password,
    };
    axios
      .post("http://localhost:9000/signup", userDetails)
      .then((res) => {
        document.cookie = res.data.data;
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div id="signupform">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          placeholder="Enter your full name"
          value={u_name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <div className="gender-container">
          <input
            type="checkbox"
            id="male"
            value="male"
            checked={gender === "male"}
            onChange={() => setGender("male")}
          />
          <label htmlFor="male">Male</label>

          <input
            type="checkbox"
            id="Female"
            value="Female"
            checked={gender === "Female"}
            onChange={() => setGender("Female")}
          />
          <label htmlFor="Female">Female</label>
        </div>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
