import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../HomePage/Home";
import Signin from "../SigninForm/Signin";
import Signup from "../SignupForm/Signup";
import Dashboard from "../Dashboard/Dashboard";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <Router>
        <nav>
          <div className="logo">
            <Link to="/">
              <img src="/assets/logo.png" alt="JOBHUB" />
            </Link>
          </div>
          <div>
            <ul id="navbar">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="index.html">About</a>
              </li>
              <li>
                <a href="index.html">Contact Us</a>
              </li>
              <li>
                <a href="index.html">Learn</a>
              </li>
              <li>
                <Link to="/signin">Signin</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route exact="true" path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default Navbar;
