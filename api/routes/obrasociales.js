const express = require('express');
const router = express.Router();
const { getObraSociales } = require('../controllers/obrasociales');

router.get('/', getObraSociales);


module.exports = router;
