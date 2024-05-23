import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import JobForm from "./JobForm.js";
import JobList from "./JobList.js";
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

  const addJob = (newJob) => {
    const id = jobs.length > 0 ? jobs[jobs.length - 1].id + 1 : 1;
    const newJobWithId = { ...newJob, id, applicants: [] };
    setJobs([...jobs, newJobWithId]);
  };

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
  };

  const applyToJob = (jobId, applicantName) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === jobId && !job.applicants.includes(applicantName)) {
        return { ...job, applicants: [...job.applicants, applicantName] };
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  return (
    <>
      <Navbar toggleSignIn={null} />
      <div className="employer-dashboard">
        <h2>Welcome to Your Dashboard</h2>
        <JobForm addJob={addJob} />
        <JobList jobs={jobs} deleteJob={deleteJob} applyToJob={applyToJob} />
      </div>
    </>
  );
};

export default EmployerDashboard;
