// JobForm.js
import React, { useState } from "react";

const JobForm = ({ onAddJob }) => {
  const [formData, setFormData] = useState({
    title: "",     // ✅ changed role -> title
    company: "",
    status: "applied",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddJob) {
      onAddJob(formData);
    }
    setFormData({ title: "", company: "", status: "applied" }); // ✅ reset correctly
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="company"
        placeholder="Company Name"
        value={formData.company}
        onChange={handleChange}
        required
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;
