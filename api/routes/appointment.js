const express = require('express');
const router = express.Router();
const { createAppointment, getAppointmentsByUser } = require('../controllers/appointment');

router.post('/', createAppointment);
router.get('/user/:userId', getAppointmentsByUser);

module.exports = router;
