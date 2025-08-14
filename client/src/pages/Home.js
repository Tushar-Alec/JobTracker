// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import { getJobs, addJob, deleteJob, updateJob } from '../services/api';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleAddJob = async (formData) => {
    await addJob(formData);
    loadJobs();
  };

  const handleDeleteJob = async (id) => {
    await deleteJob(id);
    loadJobs();
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    await updateJob(id, { status: nextStatus });
    loadJobs();
  };

  const getNextStatus = (status) => {
    const states = ['applied', 'interview', 'offer', 'rejected'];
    const index = states.indexOf(status);
    return index < states.length - 1 ? states[index + 1] : states[0];
  };

  return (
    <div>
      <h2>Job Tracker</h2>
      <JobForm onAddJob={handleAddJob} />
      <JobList jobs={jobs} onDelete={handleDeleteJob} onUpdate={handleUpdateStatus} />
    </div>
  );
};

export default Home;
