const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../env');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
