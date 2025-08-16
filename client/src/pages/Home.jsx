import React, { useState } from "react";
import Navbar from "../components/NAvbar";
import JobList from "../components/JobList";
import JobForm from "../components/JobForm";

export default function Home() {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "Google", status: "Applied" },
    { id: 2, title: "Backend Developer", company: "Amazon", status: "Interview" }
  ]);

  const addJob = (job) => setJobs([...jobs, { ...job, id: Date.now() }]);
  const deleteJob = (id) => setJobs(jobs.filter(job => job.id !== id));

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <JobForm onAdd={addJob} />
        <JobList jobs={jobs} onDelete={deleteJob} />
      </div>
    </>
  );
}
