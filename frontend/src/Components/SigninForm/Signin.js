import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

// Styled Paper component with frosted glass effect
const FrostedPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.4)", // Semi-transparent background color
  backdropFilter: "blur(5px)", // Blur effect
  WebkitBackdropFilter: "blur(10px)", // For Safari support
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Box shadow for depth
  padding: "20px",
  alignItems: "center",
  height: '50vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}));

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const userDetails = {
      email,
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
      <FrostedPaper elevation={3}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </FrostedPaper>
    </div>
  );
};

export default Signin;
