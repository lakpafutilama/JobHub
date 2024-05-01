import React, { useState } from "react";
import "./EmployerDashboard.css";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Software Engineer",
      description:
        "We are looking for a skilled software engineer to join our team.",
      applicants: ["John Doe", "Jane Smith"],
    },
    {
      id: 2,
      title: "Web Developer",
      description:
        "Join our team as a web developer and work on exciting projects.",
      applicants: ["Alice Johnson", "Bob Brown"],
    },
    {
      id: 3,
      title: "Data Analyst",
      description:
        "Seeking a data analyst to analyze and interpret complex data.",
      applicants: [],
    },
  ]);

  const [newJob, setNewJob] = useState({ title: "", description: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleJobSubmit = (event) => {
    event.preventDefault();
    if (newJob.title && newJob.description) {
      const id = jobs.length > 0 ? jobs[jobs.length - 1].id + 1 : 1;
      const newJobWithId = { ...newJob, id, applicants: [] };
      setJobs([...jobs, newJobWithId]);
      setNewJob({ title: "", description: "" });
    }
  };

  const handleJobDelete = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
  };

  const handleJobApplication = (jobId, applicantName) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === jobId && !job.applicants.includes(applicantName)) {
        return { ...job, applicants: [...job.applicants, applicantName] };
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  return (
    <div className="organization-dashboard">
      <nav className="navbar">
        <div className="menu-icon">&#9776;</div>
        <div className="user-profile">User Profile &#9662;</div>
        <div className="logout-icon">&#128100;</div>
      </nav>

      <h2>Welcome to Your Dashboard</h2>

      <form onSubmit={handleJobSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newJob.title}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={newJob.description}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create Job</button>
      </form>

      <div className="job-listings">
        <h3>Your Jobs</h3>
        {jobs.map((job) => (
          <div key={job.id} className="job">
            <h4>{job.title}</h4>
            <p>{job.description}</p>
            <button onClick={() => handleJobDelete(job.id)}>Delete</button>
            <h5>Applicants:</h5>
            <ul>
              {job.applicants.map((applicant, index) => (
                <li key={index}>{applicant}</li>
              ))}
            </ul>
            <button onClick={() => handleJobApplication(job.id, "John Doe")}>
              Apply John Doe
            </button>
            <button onClick={() => handleJobApplication(job.id, "Jane Smith")}>
              Apply Jane Smith
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;
