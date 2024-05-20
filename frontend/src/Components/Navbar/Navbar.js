import React from "react";
import "./Navbar.css";

function Navbar({ toggleSignIn }) {
  return (
    <nav>
      <div className="logo">
        <a href="#home">
          <img src="/assets/logo.png" alt="JOBHUB" />
        </a>
      </div>
      <div>
        <ul id="navbar">
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
          <li>
            <button onClick={toggleSignIn}>Signin</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
