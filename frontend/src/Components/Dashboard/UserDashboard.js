import React, { useState, useEffect } from "react";

// Dummy data for job listings
const dummyJobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "ABC Inc",
    location: "New York",
  },
  {
    id: 2,
    title: "Web Developer",
    company: "XYZ Corp",
    location: "San Francisco",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "123 Industries",
    location: "Chicago",
  },
];

// Dummy data for applicant profiles
const dummyApplicants = [
  { id: 1, name: "John Doe", skills: ["JavaScript", "React", "Node.js"] },
  { id: 2, name: "Jane Smith", skills: ["Python", "Django", "SQL"] },
  { id: 3, name: "Alice Johnson", skills: ["Java", "Spring", "Hibernate"] },
];

const UserDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);

  // Fetch data (dummy data in this case)
  useEffect(() => {
    // Simulating API call to fetch job listings
    setTimeout(() => {
      setJobs(dummyJobs);
    }, 1000);

    // Simulating API call to fetch applicant profiles
    setTimeout(() => {
      setApplicants(dummyApplicants);
    }, 1500);
  }, []);

  return (
    <div className="user-dashboard">
      <h2>Welcome to JOBHUB</h2>

      <div className="job-listings">
        <h3>Job Listings</h3>
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.title}</strong> - {job.company} ({job.location})
            </li>
          ))}
        </ul>
      </div>

      <div className="applicant-profiles">
        <h3>Your Applicants</h3>
        <ul>
          {applicants.map((applicant) => (
            <li key={applicant.id}>
              <strong>{applicant.name}</strong> - Skills:{" "}
              {applicant.skills.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
