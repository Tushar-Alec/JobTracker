import axios from 'axios';

// Create axios instance with backend base URL
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// 🔐 Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// =======================
// Auth APIs
// =======================
export const signup = (payload) =>
  api.post('/api/auth/signup', payload).then((res) => res.data);

export const login = (payload) =>
  api.post('/api/auth/login', payload).then((res) => res.data);

// =======================
// Job APIs
// =======================
export const getJobs = () =>
  api.get('/api/jobs').then((res) => res.data);

export const addJob = (job) =>
  api.post('/api/jobs', job).then((res) => res.data);

export const deleteJob = (id) =>
  api.delete(`/api/jobs/${id}`).then((res) => res.data);

export const updateJob = (id, payload) =>
  api.patch(`/api/jobs/${id}`, payload).then((res) => res.data);

export default api;
