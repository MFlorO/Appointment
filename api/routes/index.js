const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const appointmentRoutes = require('./appointment');
const obrasociales = require('./obrasociales')


// Ruta de bienvenida
router.get('/', (req, res) => res.send('Bienvenido al backend de este proyecto!'));

// Rutas de usuario
router.use('/auth', authRoutes);

// Rutas de citas
router.use('/appointment', appointmentRoutes);

// Rutas de obrasociales
router.use('/obrasociales', obrasociales);


module.exports = router;
