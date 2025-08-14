// routes/jobs.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs ORDER BY applied_on DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new job
router.post('/', async (req, res) => {
  const { company, role, status, applied_on } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO jobs (company, role, status, applied_on) VALUES (?, ?, ?, ?)',
      [company, role, status, applied_on]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a job by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM jobs WHERE id = ?', [id]);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
