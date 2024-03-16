const fs = require("fs/promises");
const path = require("path");

const getAllUsers = async (req, res) => {
    const users = await fs.readFile(path.join(__dirname, "../../db/users.json"));
    const usersJson = JSON.parse(users);
    res.json(usersJson);
};

const loginUser = async (req, res) => {
    const { name, password } = req.body; // Recibir nombre y contraseña del cuerpo de la solicitud

    const data = await fs.readFile(path.join(__dirname, '../../db/users.json'));

    if (data) {
        const users = JSON.parse(data).users;
        // Buscar el usuario por nombre y contraseña
        const user = users.find(u => u.name === name && u.password === password);

        if (user) {
            // Usuario encontrado y contraseña correcta
            res.status(200).send({ code: 1, message: 'Inicio de sesión exitoso', user: { id: user.id, name: user.name, role: user.role } });
        } else {
            // Usuario no encontrado o contraseña incorrecta
            res.status(401).send({ code: 1, message: 'Nombre de usuario o contraseña incorrectos' });
        }
    } else {
        console.error(err);
        return res.status(500).send('Error al leer el archivo de usuarios');
    }
};

const createUser = async (req, res) => {
    const { name, role } = req.body; // Se espera que nombre llegue como "Nombre Apellido"
    const firstName = name.split(' ')[0]; // Extraemos el primer nombre

    await fs.readFile(path.join(__dirname, '../../db/users.json'), (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al leer el archivo de usuarios');
        }

        const users = JSON.parse(data).users;

        // Calcular el nuevo ID
        const newId = users.reduce((maxId, user) => user.id > maxId ? user.id : maxId, 0) + 1;

        // Determinar el número inicial de contraseña según el rol
        let baseNumber = role === "mesero" ? 5678 : role === "cocina" ? 9012 : 0;
        users.forEach(user => {
            if (user.nombre.split(' ')[0] === firstName && user.role === role) {
                baseNumber++;
            }
        });
        const password = `${firstName}${baseNumber}`;

        // Crear el nuevo usuario con contraseña automática
        const newUser = { id: newId, name, password, role };

        // Insertar el nuevo usuario
        users.push(newUser);

        fs.writeFile(path.join(__dirname, '../../db/users.json'), JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al escribir en el archivo de usuarios');
            }

            res.status(201).send('Usuario agregado con éxito');
        });
    });

};

const updateUser = async (req, res) => {
    const { id } = req.params; // El ID del usuario a editar
    const { name, role } = req.body; // Los nuevos valores para nombre y rol

    await fs.readFile(path.join(__dirname, '../../db/users.json'), (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al leer el archivo de usuarios');
        }

        const users = JSON.parse(data).users;

        // Encontrar el índice del usuario a editar
        const index = users.findIndex(user => user.id == id);

        if (index === -1) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Actualizar el nombre y el rol del usuario
        if (name) users[index].name = name;
        if (role) users[index].role = role;

        fs.writeFile(path.join(__dirname, '../../db/users.json'), JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al escribir en el archivo de usuarios');
            }

            res.status(200).send('Usuario actualizado con éxito');
        });
    });

};

module.exports = {
    loginUser,
    getAllUsers,
    createUser,
    updateUser
};
