const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const authMiddleware = require('./middleware/auth');
const jobRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth');

const app = express(); // ✅ initialize early
const PORT = 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(bodyParser.json());

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL DB');
});

// Health check
app.get('/', (req, res) => {
  res.send('Welcome to the Job Tracker API!');
});

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/jobs', authMiddleware, jobRoutes); // ✅ protected jobs route

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
