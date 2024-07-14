const express = require('express');
const router = express.Router();
const { registerUser, loginUser, renewToken } = require('../controllers/auth');
const authenticateToken = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/renew-token', authenticateToken, renewToken);

// Ruta protegida
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Esta es una ruta protegida' });
});

module.exports = router;
