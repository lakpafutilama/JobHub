import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import JobList from "./JobList.js";
import { Button, Box, Modal, TextField } from "@mui/material";
import "./Dashboard.css";
import { getCookie } from "../../helper/AccessToken";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const token = getCookie();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobHistory, setJobHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [newJob, setNewJob] = useState({
    resume: null,
    summary: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setNewJob({ ...newJob, resume: files[0] });
    } else {
      setNewJob({ ...newJob, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (newJob.resume) {
      const formData = new FormData();
      formData.append("resume", newJob.resume);

      try {
        const response = await axios.put(
          "http://localhost:9000/user/resume",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token,
            },
          }
        );
        alert(response.data.data);
        setNewJob({ resume: null, summary: "" });
        setOpen(false);
        window.location.reload();
      } catch (err) {
        alert(err.response.data.message);
      }
    }
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
          {/* <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            style={{ marginRight: 10 }}
          >
            Upload Resume
          </Button> */}
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
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <TextField
            label="Summary"
            name="summary"
            value={newJob.summary}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            name="resume"
            onChange={handleInputChange}
            accept=".pdf,.doc,.docx"
            style={{ margin: "20px 0" }}
          />
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </Modal>

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
