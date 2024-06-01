const express = require('express');
const router = express.Router();
const ventasController = require('../routes/controllers/ventasController');

// Ruta para obtener todas las ventas
router.get('/', ventasController.getAllVentas);

module.exports = router;