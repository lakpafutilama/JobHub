import React from "react";
import "./JobList.css";

const ViewList = ({ searchJobs }) => {
  return (
    <div className="job-listings">
      <h3>Search Jobs</h3>
      {searchJobs.map((job) => (
        <div key={job.id} className="job">
          <h4>{job.title}</h4>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewList;
