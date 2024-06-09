import Avatar from "@mui/material/Avatar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../helper/AccessToken";
import "./JobList.css";
import { Grid, Button } from "@mui/material";

const JobList = ({ deleteJob, openEditModal, role }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const token = getCookie();

  useEffect(() => {
    const api =
      role === "user"
        ? "http://localhost:9000/job/list"
        : "http://localhost:9000/job/list/specific";

    const fetchData = async () => {
      try {
        const response = await axios.get(api, {
          headers: {
            token,
          },
        });
        setJobs(response.data.data);
      } catch (error) {
        console.error("Error fetching job list:", error);
      }
    };

    fetchData();
  }, [role, token]);

  const handleClose = async (id) => {
    try {
      await axios.post(
        `http://localhost:9000/application`,
        { job_id: id },
        {
          headers: {
            token: getCookie(),
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.error("Error closing job:", error);
    }
  };

  const openApplicantModal = (applicant, job) => {
    setSelectedApplicant(applicant);
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {role === "user" ? (
        <div className="job-listings">
          <h2>Active Jobs</h2>
          {jobs.length ? (
            jobs.map((job) => (
              <div key={job._id} className="job">
                <h4>{job.title.toUpperCase()}</h4>
                <div className="job-header">
                  <button
                    onClick={() => handleClose(job._id)}
                    style={{ backgroundColor: "green" }}
                  >
                    Apply Job
                  </button>
                </div>
                <p style={{ marginRight: "300px", textAlign: "justify" }}>
                  {job.description}
                </p>
                <p>Location: {job.location}</p>
                <p>No of Applicants: {job.applicant}</p>
              </div>
            ))
          ) : (
            <div
              className="job"
              style={{
                color: "white",
                fontSize: 18,
                backgroundColor: "lightgreen",
              }}
            >
              You don't have any active
              <br />
              Create new job
              <br />
            </div>
          )}
        </div>
      ) : (
        <div className="job-listings">
          <h2>Active Jobs</h2>
          {jobs.length ? (
            jobs.map((job) => (
              <div key={job._id} className="job">
                <h4>{job.title.toUpperCase()}</h4>
                <div className="job-header">
                  <button
                    className="job-buttons"
                    onClick={() => openEditModal(job)}
                    style={{ backgroundColor: "#1434A4" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteJob(job._id)}
                    style={{ backgroundColor: "#DC143C" }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleClose(job._id)}
                    style={{ backgroundColor: "#393440" }}
                  >
                    Close Vacancy
                  </button>
                </div>
                <p style={{ marginRight: "300px", textAlign: "justify" }}>
                  {job.description}
                </p>
                <div>
                  <p>No. of Applicants: {job.applicant}</p>
                  <ol style={{ fontSize: 18 }}>
                    {job.applicants.map((applicant) => (
                      <li key={applicant._id}>
                        {applicant.username}
                        <button
                          onClick={() => openApplicantModal(applicant, job)}
                          style={{ backgroundColor: "#4299e1", marginLeft: 25 }}
                        >
                          View Resume
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))
          ) : (
            <div
              className="job"
              style={{
                color: "white",
                fontSize: 18,
                backgroundColor: "lightgreen",
              }}
            >
              You don't have any active
              <br />
              Create new job
              <br />
            </div>
          )}

          {showModal &&
            selectedApplicant && ( // Render modal conditionally
              <Modal
                applicant={selectedApplicant}
                closeModal={closeModal}
                job={selectedJob}
              />
            )}
        </div>
      )}
    </>
  );
};

const Modal = ({ applicant, closeModal, job }) => {
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const fetchResumeUrl = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/user/${applicant.user_id}`,
          {
            headers: {
              token: getCookie(),
            },
          }
        );
        setResumeUrl(response.data.data);
      } catch (error) {
        console.error("Error fetching resume URL:", error);
      }
    };

    fetchResumeUrl();
  }, [applicant.user_id]);

  const updateStatus = async (status) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/application/${applicant._id}/${job._id}`,
        { status },
        {
          headers: {
            token: getCookie(),
          },
        }
      );
      console.log(response.data.message);
      closeModal(); // Close modal after updating status
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  return (
    <div className="modal">
      <div
        className="modal-content"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          color: "black",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(10px)",
          maxWidth: 600,
          padding: 10,
          border: "1px solid #888",
          borderRadius: 8,
        }}
      >
        <span
          className="close"
          style={{
            color: "black",
            float: "right",
            fontSize: 28,
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={closeModal}
        >
          &times;
        </span>
        <h5>{applicant.full_name.toUpperCase()}</h5>
        {resumeUrl ? (
          <iframe
            src={resumeUrl}
            style={{ width: "100%", height: "500px" }}
            title="Resume"
          />
        ) : (
          <p>Loading resume...</p>
        )}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => updateStatus("accepted")}
              >
                Approve
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => updateStatus("rejected")}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default JobList;
