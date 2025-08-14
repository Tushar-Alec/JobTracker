// src/components/JobList.js
import React from 'react';

const JobList = ({ jobs, onDelete, onUpdate }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Status:</strong> {job.status}</p>

          <button onClick={() => onUpdate(job.id, job.status)}>Update Status</button>
          <button onClick={() => onDelete(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
