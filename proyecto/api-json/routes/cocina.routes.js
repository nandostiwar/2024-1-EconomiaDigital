const express = require('express');
const router = express.Router();
const pedidosController = require('../routes/controllers/pedidosControllers');
const cocinaController = require('../routes/controllers/cocinaControllers');

router.get('/', pedidosController.getAllPedidos);
router.put('/:id', cocinaController.modificarEstadoPedido);

module.exports = router;