import React from "react";
import "./JobCard.css";

export default function JobCard({ job, onEdit, onDelete }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>Status: {job.status}</p>
      <div className="job-actions">
        <button onClick={() => onEdit(job)}>Edit</button>
        <button onClick={() => onDelete(job.id)}>Delete</button>
      </div>
    </div>
  );
}
