import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";

import Dashboard from "../Dashboard/Dashboard";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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
        setLoggedIn(true);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  let content;
  if (loggedIn) {
    content = <Dashboard />;
  } else {
    content = (
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
  }

  return content;
};

export default Signin;
