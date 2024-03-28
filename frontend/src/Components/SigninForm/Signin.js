import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const userDetails = {
      username,
      password,
    };
    axios
      .post("http://localhost:9000/login", userDetails)
      .then((res) => {
        document.cookie = res.data.data;
        window.location = "http://localhost:3000/dashboard";
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div id="signinform">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Signin;
