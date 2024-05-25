import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import ViewList from "./ViewList";
import axios from "axios";
import "./Dashboard.css";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getCookie } from "../../helper/AccessToken";

const SearchJob = () => {
  const [searchJobs, setSearchJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery) {
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
      } else {
        setSearchJobs([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div
      className="employer-dashboard"
      style={{ marginTop: "150px", marginLeft: "70px" }}
    >
      <Navbar toggleSignIn={null} />
      <TextField
        label="Search Jobs"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ borderRadius: "20px", width: "400px" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: { borderRadius: 20 },
        }}
      />
      <ViewList searchJobs={searchJobs} />
    </div>
  );
};

export default SearchJob;
