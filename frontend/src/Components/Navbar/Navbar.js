import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import "./Navbar.css";

const GlassAppBar = styled(AppBar)(({}) => ({
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(10px)",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  position: "fixed",
  zIndex: 1000,
}));

function Navbar({ toggleSignIn }) {
  const location = useLocation();
  return (
    <GlassAppBar position="static">
      <Toolbar>
        <div className="logo" style={{ flexGrow: 1 }}>
          <a href="#home">
            <img src="/assets/logo.png" alt="JOBHUB" />
          </a>
        </div>
        <ul className="navbar">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#service">Service</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          {location.pathname === "/" ? (
            <li>
              <a href="#" onClick={toggleSignIn}>
                Signin
              </a>
            </li>
          ) : (
            <li>
              <Button>Menu</Button>
            </li>
          )}
        </ul>
      </Toolbar>
    </GlassAppBar>
  );
}

export default Navbar;
