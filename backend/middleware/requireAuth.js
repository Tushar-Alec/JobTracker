// middleware/requireAuth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

module.exports = function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, email }
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
