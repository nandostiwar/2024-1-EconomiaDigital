const express = require('express');
const router = express.Router();
const KitchenController = require('../controllers/kitchenController');

// Rutas para la cocina
router.get('/orders', KitchenController.getOrders);
router.put('/orders/:id', KitchenController.updateOrderStatus);

module.exports = router;
