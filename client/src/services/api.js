// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

export const getJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addJob = async (jobData) => {
  return await axios.post(API_URL, jobData);
};

export const deleteJob = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const updateJob = async (id, updatedData) => {
  return await axios.put(`${API_URL}/${id}`, updatedData);
};
