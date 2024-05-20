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
        <div className="home-content" id="home">
          <div className="header__content">
            <div className="header__content--left"></div>
            <div className="header__content--right">
              <h1 className="header__title">WELCOME</h1>
              <p className="para__text">Want to explore JOBHUB...</p>
              <Link to="/signup">
                <button className="signup-button">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
        <section className="container" id="about">
          <h2 className="title">About</h2>
          <div className="content">
            <img src="/assets/us.png" alt="Us" className="aboutImage" />
            <ul className="aboutItems">
              <li className="aboutItem">
                <div className="aboutItemText">
                  <p>
                    In the modern job search process, it bridges the gap between
                    employers and job searchers. JobHub is a platform designed
                    to help you find the perfect job. It provide a comprehensive
                    job search experience, connecting job seekers with various
                    industries. Their wide range of tools and services
                    streamlines the hiring and job search processes, making it
                    easier for businesses to find qualified candidates and job
                    seekers to find opportunities.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className="container" id="service">
          <h2 className="title">Service</h2>
          <div className="content">
            <img src="/assets/service.png" alt="Us" className="aboutImage" />
            <ul className="aboutItems">
              <li className="aboutItem">
                <div className="aboutItemText">
                  <p>
                    <ul>
                      <li>
                        Job Listings
                        <br />
                        Display a wide range of job vacancies across various
                        industries and locations. Employers post job
                        advertisements detailing the requirements,
                        responsibilities, and benefits of the positions.
                      </li>
                      <br />
                      <li>
                        Resume Uploading
                        <br />
                        Upload resumes, making it easier for employers to find
                        them based on specific skills and qualifications.
                      </li>
                      <br />
                      <li>
                        Application Tracking
                        <br />
                        Track the status of job applications, allowing users to
                        see which applications are pending, viewed, or responded
                        to by employers.
                      </li>
                      <br />
                    </ul>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <div className="footer" id="contact">
          <div className="footer__content grid text__light text__center">
            <div className="footer__content--item">
              <a href="mailto:jobhub@gmail.com">lakpa.lama4433@gmail.com</a>
              <span>
                <br />
                +977 980 123 4567
              </span>
            </div>

            <div className="footer__content--item">
              <h3 className="footer__title">Projects</h3>
              <ul className="footer__links">
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#service">Services</a>
                </li>
                <li>
                  <a href="#">Career</a>
                </li>
              </ul>
            </div>

            <div className="footer__content--item">
              <h3 className="footer__title">News</h3>
              <ul className="footer__links">
                <li>
                  <a href="#">Events</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Legals</a>
                </li>
              </ul>
            </div>

            <div className="footer__content--item">
              <h3 className="footer__title">Social Links</h3>
              <ul className="footer__links">
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
