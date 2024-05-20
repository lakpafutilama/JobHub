import React from "react";
import "./JobList.css";

const JobList = ({ jobs, deleteJob, applyToJob }) => {
  return (
    <div className="job-listings">
      <h3>Your Jobs</h3>
      {jobs.map((job) => (
        <div key={job.id} className="job">
          <h4>{job.title}</h4>
          <p>{job.description}</p>
          <button onClick={() => deleteJob(job.id)}>Delete</button>
          <h5>Applicants:</h5>
          <ul>
            {job.applicants.map((applicant, index) => (
              <li key={index}>{applicant}</li>
            ))}
          </ul>
          <button onClick={() => applyToJob(job.id, "John Doe")}>Apply John Doe</button>
          <button onClick={() => applyToJob(job.id, "Jane Smith")}>Apply Jane Smith</button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
