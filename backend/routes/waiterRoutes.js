const express = require('express');
const router = express.Router();
const WaiterController = require('../controllers/waiterController');

// Rutas para el mesero
router.get('/orders', WaiterController.getOrders);
router.post('/orders', WaiterController.createOrder);

module.exports = router;
