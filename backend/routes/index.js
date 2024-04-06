const express = require('express');
const router = express.Router();

// Importar y montar rutas
const adminRoutes = require('./adminRoutes');
const waiterRoutes = require('./waiterRoutes');
const kitchenRoutes = require('./kitchenRoutes');

router.use('/admin', adminRoutes);
router.use('/waiter', waiterRoutes);
router.use('/kitchen', kitchenRoutes);

module.exports = router;
