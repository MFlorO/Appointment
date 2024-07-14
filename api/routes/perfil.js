const express = require('express');
const router = express.Router();
const { getDataPerfil } = require('../controllers/perfil');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, getDataPerfil);


module.exports = router;
