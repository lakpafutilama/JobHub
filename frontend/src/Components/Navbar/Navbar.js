import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src="/assets/logo.png" alt="JOBHUB" />
        </Link>
      </div>
      <div>
        <ul id="navbar">
          <li>
            <Link to="/signin">
              <button>Signin</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
