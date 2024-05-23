import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import JobList from "./JobList.js";
import {
  Button,
  Box,
  Modal,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./EmployerDashboard.css";
import { getCookie } from "../../helper/AccessToken";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const token = getCookie();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editJob, setEditJob] = useState({
    id: "",
    title: "",
    description: "",
    region: "",
    district: "",
  });
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    region: "",
    district: "",
  });
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [jobHistory, setJobHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false); // New state for controlling history modal visibility

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditModalOpen = (job) => {
    setEditModalOpen(true);
    setEditJob(job);
  };

  const handleEditModalClose = () => setEditModalOpen(false);

  const handleEditSubmit = async () => {
    try {
      const { id, title, description, region, district } = editJob;
      const data = {
        title,
        description,
        location: district,
      };
      await axios.put(`http://localhost:9000/job/${id}`, data, {
        headers: {
          token,
        },
      });
      const updatedJobs = jobs.map((job) =>
        job._id === id ? { ...job, title, description, region, district } : job
      );
      setJobs(updatedJobs);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9000/job/list/specific`, {
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

    fetch("http://localhost:9000/regions")
      .then((response) => response.json())
      .then((data) => setRegions(data.data));
  }, []);

  useEffect(() => {
    if (editModalOpen) {
      fetchJobDetails(editJob.id);
    }
  }, [editModalOpen]);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/job/filtered?status=closed`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        setJobHistory(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching job history:", error);
      });
  }, []);

  const fetchJobDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/job/details/${id}`,
        {
          headers: {
            token,
          },
        }
      );
      const job = response.data.data;
      setEditJob({
        id: job._id,
        title: job.title,
        description: job.description,
        region: job.region,
        district: job.district,
      });
      setDistricts([job.district]);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });

    if (name === "region") {
      fetch(`http://localhost:9000/district/${value}`)
        .then((response) => response.json())
        .then((data) => {
          setDistricts(data.data);
        });
    }
  };

  const handleSubmit = () => {
    if (
      newJob.title &&
      newJob.description &&
      newJob.region &&
      newJob.district
    ) {
      const data = {
        title: newJob.title,
        description: newJob.description,
        location: newJob.district,
      };

      axios
        .post("http://localhost:9000/job", data, {
          headers: {
            token,
          },
        })
        .then((res) => {
          alert(res.data.data);
          setNewJob({ title: "", description: "", region: "", district: "" });
          setOpen(false);
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  const deleteJob = async (id) => {
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

  const handleHistoryModalOpen = () => {
    setShowHistoryModal(true);
  };

  const handleHistoryModalClose = () => {
    setShowHistoryModal(false);
  };

  return (
    <>
      <Navbar toggleSignIn={null} />
      <div className="employer-dashboard">
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
            color="primary"
            onClick={handleOpen}
            style={{ marginRight: 10 }}
          >
            Create Job
          </Button>
          <Button
            variant="contained"
            onClick={handleHistoryModalOpen}
            style={{ backgroundColor: "grey" }}
          >
            History
          </Button>
        </div>
        <JobList deleteJob={deleteJob} openEditModal={handleEditModalOpen} />
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <h2>Create a New Job</h2>
          <TextField
            label="Job Title"
            name="title"
            value={newJob.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Job Description"
            name="description"
            value={newJob.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Region</InputLabel>
            <Select
              name="region"
              value={newJob.region}
              onChange={handleInputChange}
            >
              {regions.map((region, index) => (
                <MenuItem key={index} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>District</InputLabel>
            <Select
              name="district"
              value={newJob.district}
              onChange={handleInputChange}
            >
              {districts.map((district, index) => (
                <MenuItem key={index} value={district}>
                  {district}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Post
          </Button>
        </Box>
      </Modal>

      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <Box className="modal-box">
          <h2>Edit Job</h2>
          <TextField
            label="Job Title"
            name="title"
            value={editJob.title}
            onChange={(e) => setEditJob({ ...editJob, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Job Description"
            name="description"
            value={editJob.description}
            onChange={(e) =>
              setEditJob({ ...editJob, description: e.target.value })
            }
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Region</InputLabel>
            <Select
              name="region"
              value={editJob.region}
              onChange={(e) =>
                setEditJob({ ...editJob, region: e.target.value })
              }
            >
              {regions.map((region, index) => (
                <MenuItem key={index} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>District</InputLabel>
            <Select
              name="district"
              value={editJob.district}
              onChange={(e) =>
                setEditJob({ ...editJob, district: e.target.value })
              }
            >
              {districts.map((district, index) => (
                <MenuItem key={index} value={district}>
                  {district}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditSubmit}
          >
            Update
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
              <div key={job._id} className="job">
                <div className="job-header">
                  <h4>{job.title}</h4>
                </div>
                <div>
                  <p>Description: {job.description}</p>
                </div>
                <div>
                  <p>Location: {job.location}</p>
                </div>
                <div>
                  <p>Status: {job.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default EmployerDashboard;
