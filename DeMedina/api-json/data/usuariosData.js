const Usuario = require('../models/usuario');

// Obtener todos los usuarios
const getAllUsuarios = async () => {
    const usuarios = await Usuario.find().lean();
    return { usuarios };
};

// Autenticar usuario
const userAutenticar = async (email, password) => {
    const user = await Usuario.findOne({ email, password }).lean();
    return { usuarios: [user] };
};

// Crear un nuevo usuario
const createUsuario = async (email, password, rol) => {
    const ultimoUsuario = await Usuario.findOne().sort({ id: -1 }).lean();
    const nuevoIdUsuario = ultimoUsuario ? ultimoUsuario.id + 1 : 1;

    const newUser = new Usuario({
        id: nuevoIdUsuario,
        email,
        password,
        rol,
    });

    await newUser.save();
    return { usuarios: [newUser.toObject()] };
};

// Actualizar un usuario
const updateUsuario = async (userId, email, password, rol) => {
    const user = await Usuario.findOneAndUpdate(
        { id: userId },
        { email, password, rol },
        { new: true }
    ).lean();

    return { usuarios: [user] };
};

// Eliminar un usuario
const deleteUsuario = async (userId) => {
    const user = await Usuario.findOneAndDelete({ id: userId }).lean();
    return { usuarios: [user] };
};

module.exports = {
    getAllUsuarios,
    userAutenticar,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
