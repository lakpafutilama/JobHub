import React, { useState } from "react";
import "./JobForm.css";

const JobForm = ({ addJob }) => {
  const [newJob, setNewJob] = useState({ title: "", description: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newJob.title && newJob.description) {
      addJob(newJob);
      setNewJob({ title: "", description: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
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
  );
};

export default JobForm;
