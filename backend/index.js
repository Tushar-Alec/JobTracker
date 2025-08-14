const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mysql@108',  // 🔁 Replace with your MySQL password
  database: 'job_tracker'     // 🔁 Make sure this DB exists!
});

app.get('/', (req, res) => {
  res.send('Welcome to the Job Tracker API!');
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL DB');
});

// API route to insert job
app.post('/api/jobs', (req, res) => {
  const { title, company, status } = req.body;

  const query = 'INSERT INTO jobs (title, company, status) VALUES (?, ?, ?)';
  db.query(query, [title, company, status], (err, result) => {
    if (err) {
      console.error('Error inserting job:', err);
      return res.status(500).json({ error: 'Failed to insert job' });
    }
    res.status(201).json({ message: 'Job inserted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// GET all jobs
app.get('/api/jobs', (req, res) => {
  db.query('SELECT * FROM jobs', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch jobs' });
    res.json(results);
  });
});

// DELETE job
app.delete('/api/jobs/:id', (req, res) => {
  db.query('DELETE FROM jobs WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete job' });
    res.json({ message: 'Job deleted successfully' });
  });
});

// UPDATE job status
app.put('/api/jobs/:id', (req, res) => {
  const { status } = req.body;
  db.query('UPDATE jobs SET status = ? WHERE id = ?', [status, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update job' });
    res.json({ message: 'Job updated successfully' });
  });
});
