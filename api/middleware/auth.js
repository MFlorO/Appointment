const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../env');


const authenticateToken = (req, res, next) => {
  
  // const token = req.headers['authorization'];
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbmkiOiIzODQxMTA3NyIsImlhdCI6MTcyMDkyNzQ1MiwiZXhwIjoxNzIwOTMxMDUyfQ.IqauQly16n9gX8o-JFx0XyA5vSKLrtSznJrXKJxuqio';

  if (!token) return res.status(403).json({ error: 'Token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {

    if (err) return res.status(403).json({ error: 'Invalid token' });
    
    req.user = user;
    
    next();
  });
};

module.exports = authenticateToken;
