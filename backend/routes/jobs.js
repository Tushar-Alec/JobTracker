// routes/jobs.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all jobs for the logged-in user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      'SELECT * FROM jobs WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new job for this user
router.post('/', async (req, res) => {
  const { company, role, status, created_at } = req.body || {};
  if (!company || !role || !status) {
    return res.status(400).json({ message: 'company, role, status are required' });
  }

  try {
    const userId = req.user.id;
    const [result] = await pool.query(
      'INSERT INTO jobs (company, role, status, created_at, user_id) VALUES (?, ?, ?, ?, ?)',
      [company, role, status, created_at || new Date(), userId]
    );

    const newJob = {
      id: result.insertId,
      company,
      role,
      status,
      created_at: created_at || new Date(),
      user_id: userId
    };

    res.status(201).json(newJob); // ✅ send full job back
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update job (e.g., status) — only if it belongs to this user
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { company, role, status, created_at } = req.body || {};
  const userId = req.user.id;

  // Only update provided fields
  const fields = [];
  const values = [];
  if (company) { fields.push('company = ?'); values.push(company); }
  if (role)    { fields.push('role = ?');    values.push(role); }
  if (status)  { fields.push('status = ?');  values.push(status); }
  if (created_at !== undefined) { fields.push('created_at = ?'); values.push(created_at || null); }

  if (!fields.length) return res.status(400).json({ message: 'Nothing to update' });

  values.push(id, userId);

  try {
    await pool.query(
      `UPDATE jobs SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );
    res.json({ message: 'Job updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a job — only if it belongs to this user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    await pool.query('DELETE FROM jobs WHERE id = ? AND user_id = ?', [id, userId]);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
