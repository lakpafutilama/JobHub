import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import JobList from "./JobList.js";
import { Button, Box, Modal } from "@mui/material";
import "./Dashboard.css";
import { getCookie } from "../../helper/AccessToken";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const token = getCookie();
  const [jobs, setJobs] = useState([]);
  const [jobHistory, setJobHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const applyJob = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/job/${id}`, {
        headers: {
          token,
        },
      });

      const updatedJobs = jobs.filter((job) => job._id !== id);
      setJobs(updatedJobs);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9000/application/user`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        console.log("data", response.data);
        setJobHistory(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching job history:", error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/job/list`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        setJobs(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching job list:", error);
      });
  }, [token]);

  const handleHistoryModalOpen = () => {
    setShowHistoryModal(true);
  };

  const handleHistoryModalClose = () => {
    setShowHistoryModal(false);
  };
  return (
    <>
      <Navbar toggleSignIn={null} />
      <div className="dashboard">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate("/search");
          }}
        >
          Search Jobs
        </Button>
        <div className="create-button-container">
          <Button
            variant="contained"
            onClick={handleHistoryModalOpen}
            style={{ backgroundColor: "grey" }}
          >
            Archive
          </Button>
        </div>
        <JobList deleteJob={applyJob} openEditModal={""} role={"user"} />
      </div>

      <Modal open={showHistoryModal} onClose={handleHistoryModalClose}>
        <Box
          className="modal-box"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <h2>Job History</h2>
          <div>
            {jobHistory.map((job) => (
              <div key={job.job._id} className="job">
                <div className="job-header">
                  <h3>{job.job.title}</h3>
                </div>
                <div>
                  <p>Description: {job.job.description}</p>
                </div>
                <div>
                  <p>Location: {job.job.location}</p>
                </div>
                <div>
                  <p>Job Status: {job.job.status}</p>
                </div>
                <div>
                  <p>User Status: {job.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UserDashboard;
