const express = require('express');
const router = express.Router();
const pedidosController = require('../routes/controllers/pedidosControllers');

router.get('/', pedidosController.getAllPedidos);
router.post('/', pedidosController.createPedido);
router.put('/:id', pedidosController.updatePedido);
router.delete('/:id', pedidosController.deletePedido);

module.exports = router;