const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
router
    .get('/', userController.getAllUsuarios)
    .post('/login', userController.userAutenticar)
    // .get('/:id', userController.getUsuarioById)
    .post('/', userController.createUsuario)
    .put('/:id', userController.updateUsuario)
    .delete('/:id', userController.deleteUsuario)

    // .get('/:usuario', userController.getOneSigno)
    // .patch('/:editarUsuario', userController.updateSigno)

module.exports = router;