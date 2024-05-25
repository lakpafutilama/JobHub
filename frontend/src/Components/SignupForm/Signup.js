import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const FrostedPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.7)",
  color: "black",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(10px)",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  alignItems: "center",
  height: "49vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/user/signup", formData)
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (event) => {
    setFormData({
      ...formData,
      role: event.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div id="signupform">
      <FrostedPaper elevation={3}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <Input
            type="name"
            placeholder="Enter your full name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Input
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Input
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <div>
            <FormControl
              sx={{
                minWidth: 250,
                marginBottom: 4,
              }}
            >
              <InputLabel id="role-select-label">Signup as</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={formData.role}
                label="role"
                onChange={handleSelectChange}
                sx={{
                  height: 40,
                }}
              >
                <MenuItem value={"user"}>User</MenuItem>
                <MenuItem value={"organization"}>Organization</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button type="submit" variant="contained">
            Signup
          </Button>
        </form>
      </FrostedPaper>
    </div>
  );
};

export default Signup;
