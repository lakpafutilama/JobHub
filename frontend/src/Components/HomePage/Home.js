import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <main className="main-content">
        <div className="home-content">
          <div className="content">
            <h1>Welcome to JobHub</h1>
            <p>
              JobHub is a platform designed to help you find the perfect job. We
              provide a comprehensive job search experience, connecting job
              seekers with employers from various industries.
            </p>
            <p>Want to explore JOBHUB...</p>
            <Link to="/signup">
              <button className="signup-button">Sign Up</button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
