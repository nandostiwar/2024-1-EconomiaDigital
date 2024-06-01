
const fs = require('fs/promises');
const path = require('path');
const usuariosData = require('../../data/usuariosData'); 

const getAllUsuarios = async (req, res)=>{
    // const usuarios = await fs.readFile(path.join(__dirname,'../../db/usuarios.json'));
    // const usuariosJson = JSON.parse(usuarios)
    // res.json(usuariosJson);
    try {
        const usuariosJson = await usuariosData.getAllUsuarios();
        res.json(usuariosJson);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
}


const userAutenticar = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usuariosData.userAutenticar(email, password);
        if (user.usuarios[0]) {
            res.status(200).json({ success: true, user: user.usuarios[0] });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al autenticar el usuario', error: error.message });
    }
    //     const user = usersData.usuarios.find(user => user.email === email && user.password === password);
    //     if (user) {
    //         res.status(200).json({ success: true, user});
    //     } else {
    //         res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    //     }
    // } catch (error) {
    //     res.status(500).json({ message: 'Error al autenticar el usuario', error: error.message });
    // }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {

    // try {
    //     // Obtener datos del cuerpo de la solicitud
    //     const { email, password, rol } = req.body;

    //     // Obtener el ID del último usuario registrado
    //     const ultimoUsuario = usersData.usuarios[usersData.usuarios.length - 1];
    //     const nuevoIdUsuario = ultimoUsuario ? ultimoUsuario.id + 1 : 1;

    //     // Crear el nuevo usuario con el ID obtenido
    //     const newUser = { id: nuevoIdUsuario, email, password, rol };

    //     // Agregar el nuevo usuario a la lista de usuarios
    //     usersData.usuarios.push(newUser);

    //     // Escribir los datos actualizados en el archivo JSON de usuarios
    //     await fs.writeFile(path.join(__dirname, '../../db/usuarios.json'), JSON.stringify(usersData, null, 2));

    //     // Responder con el usuario creado
    //     res.status(201).json({ success: true, message: 'Usuario creado correctamente', user: newUser });
    // } catch (error) {
    //     // Manejo de errores
    //     console.error('Error al crear el usuario:', error);
    //     res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    // }

    try {
        const { email, password, rol } = req.body;
        const newUser = await usuariosData.createUsuario(email, password, rol);
        res.status(201).json({ success: true, message: 'Usuario creado correctamente', user: newUser.usuarios[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { email, password, rol } = req.body;
        const updatedUser = await usuariosData.updateUsuario(userId, email, password, rol);
        if (updatedUser.usuarios[0]) {
            res.json({ success: true, message: 'Usuario actualizado correctamente', user: updatedUser.usuarios[0] });
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
    }
    // try {
    //     const userId = parseInt(req.params.id);
    //     const { email, password, rol } = req.body;
    //     const userIndex = usersData.usuarios.findIndex(user => user.id === userId);
    //     if (userIndex !== -1) {
    //         usersData.usuarios[userIndex] = { id: userId, email, password, rol };
    //         await fs.writeFile(path.join(__dirname, '../../db/usuarios.json'), JSON.stringify(usersData, null, 2));
    //         res.json({ success: true, message: 'Usuario actualizado correctamente', user: usersData.usuarios[userIndex] });
    //     } else {
    //         res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    //     }
    // } catch (error) {
    //     res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
    // }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
    // try {
    //     const userId = parseInt(req.params.id);
    //     const userIndex = usersData.usuarios.findIndex(user => user.id === userId);
    //     if (userIndex !== -1) {
    //         const deletedUser = usersData.usuarios.splice(userIndex, 1);
    //         await fs.writeFile(path.join(__dirname, '../../db/usuarios.json'), JSON.stringify(usersData, null, 2));
    //         res.json({ success: true, message: 'Usuario eliminado correctamente', user: deletedUser });
    //     } else {
    //         res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    //     }
    // } catch (error) {
    //     res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    // }
    try {
        const userId = parseInt(req.params.id);
        const deletedUser = await usuariosData.deleteUsuario(userId);
        if (deletedUser.usuarios[0]) {
            res.json({ success: true, message: 'Usuario eliminado correctamente', user: deletedUser.usuarios[0] });
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
};

module.exports = {
    getAllUsuarios,
    userAutenticar,
    createUsuario,
    updateUsuario,
    deleteUsuario
};