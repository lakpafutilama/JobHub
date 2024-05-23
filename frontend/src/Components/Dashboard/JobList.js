import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../helper/AccessToken";
import "./JobList.css";

const JobList = ({ deleteJob, openEditModal }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const token = getCookie();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/job/list/specific",
          {
            headers: {
              token,
            },
          }
        );
        setJobs(response.data.data);
      } catch (error) {
        console.error("Error fetching job list:", error);
      }
    };

    fetchData();
  }, []);

  const handleClose = async (id) => {
    try {
      await axios.put(
        `http://localhost:9000/job/${id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.error("Error closing job:", error);
    }
  };

  const openApplicantModal = (applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true); // Show modal when View Resume button is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <div className="job-listings">
      <h3>Active Jobs</h3>
      {jobs.length ? (
        jobs.map((job) => (
          <div key={job._id} className="job">
            <div className="job-header">
              <h4>{job.title.toUpperCase()}</h4>
              <button
                className="cb"
                onClick={() => handleClose(job._id)}
                style={{ backgroundColor: "#393440" }}
              >
                Close Vacancy
              </button>
            </div>
            <p>{job.description}</p>
            <div>
              <p>Applied: {job.applicant}</p>
              <button
                className="job-buttons"
                onClick={() => openEditModal(job)}
                style={{ backgroundColor: "#4299e1" }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteJob(job._id)}
                style={{ backgroundColor: "#DC143C" }}
              >
                Delete
              </button>
            </div>
            <div>
              <p>Applicants: {job.applicant}</p>
              <ol style={{ fontSize: 18 }}>
                {job.applicants.map((applicant) => (
                  <li key={applicant._id}>
                    {applicant.username}
                    <button
                      onClick={() => openApplicantModal(applicant)}
                      style={{ backgroundColor: "blue", marginLeft: 25 }}
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
          <Modal applicant={selectedApplicant} closeModal={closeModal} />
        )}
    </div>
  );
};

const Modal = ({ applicant, closeModal }) => {
  return (
    <div className="modal">
      <div
        className="modal-content"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          color: "black",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(10px)",
          maxWidth: "600",
          padding: "10",
          border: "1px solid #888",
          borderRadius: 8,
        }}
      >
        <span
          className="close"
          style={{
            color: "black",
            float: "right",
            fontSize: "28",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={closeModal}
        >
          &times;
        </span>
        <h5>{applicant.full_name.toUpperCase()}</h5>
        <iframe
          src={
            (`http://localhost:9000/user/${applicant._id}}`,
            { headers: { token: getCookie() } })
          }
          style={{ width: "100%", height: "500px" }}
        />
      </div>
    </div>
  );
};

export default JobList;
