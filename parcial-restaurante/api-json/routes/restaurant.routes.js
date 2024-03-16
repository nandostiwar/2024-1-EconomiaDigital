const express = require('express');
const router = express.Router();
const usersController = require('./controllers/usersController.js');
const ordersController = require('./controllers/ordersController.js');
router
    .get('/', usersController.getAllUsers)
    .post('/login', usersController.loginUser)
    .post('/users', usersController.createUser)
    .patch('/:userEdit', usersController.updateUser)
    .get('/orders', ordersController.getAllOrders)

module.exports = router;