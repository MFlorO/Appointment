const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const appointmentRoutes = require('./appointment');
const obrasociales = require('./obrasociales')
const perfil = require('./perfil')


// Ruta de bienvenida
router.get('/', (req, res) => res.send('Bienvenido al backend de este proyecto!'));

// Rutas de usuario
router.use('/auth', authRoutes);

// Rutas de citas
router.use('/appointment', appointmentRoutes);

// Rutas de obrasociales
router.use('/obrasociales', obrasociales);

// Rutas del perfil
router.use('/perfil', perfil);


module.exports = router;
