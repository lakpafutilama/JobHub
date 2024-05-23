import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../helper/AccessToken";
import "./JobList.css";

const JobList = ({ deleteJob, openEditModal }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
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

  const handleApplicantClick = (applicants) => {
    setSelectedApplicants(applicants);
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
              <p>Applicants:</p>
              <ul>
                {job.applicants.map((applicant) => (
                  <li
                    key={applicant.username}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleApplicantClick(applicant)}
                  >
                    {applicant.user_id}
                  </li>
                ))}
              </ul>
            </div>
            {selectedApplicants.length > 0 && (
              <div>
                <h4>Selected Applicants</h4>
                <ul>
                  {selectedApplicants.map((applicant) => (
                    <li key={applicant._id}>{applicant.username}</li>
                  ))}
                </ul>
              </div>
            )}
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
  );
};

export default JobList;
