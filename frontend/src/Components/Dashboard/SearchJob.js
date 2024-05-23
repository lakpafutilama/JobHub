import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import ViewList from "./ViewList";
import axios from "axios";
import "./EmployerDashboard.css";
import { TextField } from "@mui/material";
import { getCookie } from "../../helper/AccessToken";

const SearchJob = () => {
  const [searchJobs, setSearchJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/job/search/${searchQuery}`,
          {
            headers: {
              token: getCookie(),
            },
          }
        );
        setSearchJobs(response.data.data);
      } catch (error) {
        console.error("Error fetching search jobs:", error);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="employer-dashboard">
      <Navbar toggleSignIn={null} />
      <TextField
        label="Search Jobs"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ViewList searchJobs={searchJobs} />
    </div>
  );
};

export default SearchJob;
