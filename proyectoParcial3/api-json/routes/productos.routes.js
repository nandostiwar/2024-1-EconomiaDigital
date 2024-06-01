const express = require('express');
const router = express.Router();
const productosController = require('./controllers/productosController');

router
    .get('/', productosController.getAllProductos)
    .post('/', productosController.createProducto)
    .put('/:id', productosController.updateProducto)
    .delete('/:id', productosController.deleteProducto);

module.exports = router;