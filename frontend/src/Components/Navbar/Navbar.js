import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function Navbar({ toggleSignIn, home }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuEl, setMobileMenuEl] = useState(null);
  const open = Boolean(anchorEl);
  const mobileMenuOpen = Boolean(mobileMenuEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClick = (event) => {
    setMobileMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/");
  };

  return (
    <nav>
      <div className="logo">
        <a href="#home">
          <img src="/assets/logo.png" alt="JOBHUB" />
        </a>
      </div>
      {home ? (
        <>
          <ul id="navbar" className="navbar-links">
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#service">Service</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <button onClick={toggleSignIn}>Login</button>
            </li>
          </ul>
          <div className="mobile-menu-icon">
            <MenuIcon onClick={handleMobileMenuClick} />
          </div>
          <StyledMenu
            id="mobile-menu"
            MenuListProps={{
              "aria-labelledby": "mobile-menu-button",
            }}
            anchorEl={mobileMenuEl}
            open={mobileMenuOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <a href="#about">About Us</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href="#service">Service</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href="#contact">Contact</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <button onClick={toggleSignIn}>Login</button>
            </MenuItem>
          </StyledMenu>
        </>
      ) : (
        <div id="navbar" className="menu-icon-container">
          <AccountCircleIcon className="menu-icon" onClick={handleClick} />
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} disableRipple>
              <ManageAccountsIcon />
              Profile
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleLogout} disableRipple>
              <LogoutIcon />
              Logout
            </MenuItem>
          </StyledMenu>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
