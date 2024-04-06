const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// Rutas para el administrador
router.get('/users', AdminController.getUsers);
router.post('/users', AdminController.createUser);
router.put('/users/:id', AdminController.editUser);
router.delete('/users/:id', AdminController.deleteUser);

module.exports = router;
