// src/pages/Home.js
import React, { useEffect, useState } from "react";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { getJobs, addJob, deleteJob, updateJob } from "../services/api"; // use API service

const Home = () => {
  const [jobs, setJobs] = useState([]);

  // Load all jobs from backend
  const loadJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error("Error loading jobs:", err);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Add a new job
  const handleAddJob = async (formData) => {
    try {
      const newJob = await addJob(formData); 
      setJobs((prev) => [...prev, newJob]); 
      console.log("Job added:", newJob);
    } catch (err) {
      console.error("Error adding job:", err);
    }
  };

  // Delete a job
  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  // Update job status
  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      const nextStatus = getNextStatus(currentStatus);
      await updateJob(id, { status: nextStatus });
      loadJobs(); 
    } catch (err) {
      console.error("Error updating job:", err);
    }
  };

  // Status cycle logic
  const getNextStatus = (status) => {
    const states = ["applied", "interview", "offer", "rejected"];
    const index = states.indexOf(status);
    return index < states.length - 1 ? states[index + 1] : states[0];
  };

  return (
    <div className="App">
      <div className="navbar">
        <h1>Job Tracker</h1>
        <div>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/Login">Sign In</a>
          <a href="/signup">Sign Up</a> 
        </div>
      </div>

      <JobForm onAddJob={handleAddJob} />
      <JobList
        jobs={jobs}
        onDelete={handleDeleteJob}
        onUpdate={handleUpdateStatus}
      />
    </div>
  );
};

export default Home;
