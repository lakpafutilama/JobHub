import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useLocation, Link } from "react-router-dom";
import { styled } from "@mui/system";
import "./Navbar.css";

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background color
  backdropFilter: 'blur(5px)', // Blur effect
  WebkitBackdropFilter: 'blur(10px)', // For Safari support
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for depth
  position: 'fixed', // Fixed position to stick at the top
  zIndex: 1000,
}));

const NavList = styled('ul')({
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  '& li': {
    marginRight: '20px',
  },
  '& a': {
    textDecoration: 'none',
    color: 'inherit',
  },
  '& button': {
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
  },
});

function Navbar({ toggleSignIn }) {
  const location = useLocation();
  return (
    <GlassAppBar position="static">
      <Toolbar>
        <div className="logo" style={{ flexGrow: 1 }}>
          <a href="#home">
            <img src="/assets/logo.png" alt="JOBHUB" style={{ height: '40px' }} />
          </a>
        </div>
        <NavList>
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
          {location.pathname === '/' ? (
            <li>
              <a href="#" onClick={toggleSignIn}>Signin</a>
            </li>

          ) : (

            <li>
              <Button >
                Menu
              </Button>
            </li>
          )}

          {/* <li>
            <Button color="inherit" onClick={toggleSignIn}>Signin</Button>
          </li> */}
        </NavList>
      </Toolbar>
    </GlassAppBar>
  );
}

export default Navbar;