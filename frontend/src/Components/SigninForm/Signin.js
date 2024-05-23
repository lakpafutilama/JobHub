import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const FrostedPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(10px)",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  alignItems: "center",
  height: "50vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const userDetails = {
      email,
      password,
    };
    axios
      .post("http://localhost:9000/user/login", userDetails)
      .then((res) => {
        document.cookie = `token=${res.data.data.token}; path=/;`;
        const userRole = res.data.data.role;
        if (userRole) {
          navigate(`/${userRole}-dashboard`);
        } else {
          navigate("/");
        }
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
