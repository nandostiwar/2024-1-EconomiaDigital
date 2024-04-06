//Permite procesar la autenticacion de usuario
import User from "../models/user.model.js";
//Se utiliza para encriptar contraseñas
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { name, email, password, status, role } = req.body;

  try {
    //hash convierte el string a una serie de caracteres aleatorios
    const hash = await bcrypt.hash(password, 10);

    //SE CREA EL USUARIO
    const newUser = new User({
      name,
      email,
      password: hash,
      status,
      role,
    });

    //GUARDA EL USUARIO
    //Con el save se guarda en la base de datos
    const userSave = await newUser.save();
    const token = await createAccessToken({ id: userSave._id });

    //Metodo de express, crea una cookie que se guarda en el header
    res.cookie("token", token);

    //responde con el Json
    res.json({
      id: userSave._id,
      name: userSave.name,
      email: userSave.email,
      status: userSave.status,
      role: userSave.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Inicio de sesion
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //findone se utiliza para buscar un correo que conincida con el proporcionado
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    //compare, compara las contraseñas y se asegura de que esten correctas
    const ismatch = await bcrypt.compare(password, userFound.password);
    if (!ismatch)
      return res.status(400).json({ message: "Contraseña incotrrecta" });

    //Si todo esta bien, se crea el token, posteriormente responde con la cookie y el JSON
    //CREA EL TOKEN
    //Se le indica que valor se quiere encontrar
    const token = await createAccessToken({ id: userFound._id });

    //Metodo de express, crea una cookie que se guarda en el header
    res.cookie("token", token);

    //responde con el Json
    res.json({
      id: userFound._id,
      email: userFound.email,
      status: userFound.status,
      name: userFound.name,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Cerrar sesion
export const logout = (req, res) => {

  //El token va a quedar reestablecido
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// Perfil
export const profile = async (req, res) => {
  const userFoun = await User.findById(req.user.id);
  if (!userFoun)
    return res.status(400).json({ message: "Usuario no encontrado" });
  return res.json({
    id: userFoun.id,
    name: userFoun.name,
    email: userFoun.email,
    status: userFoun.status,
    role: userFoun.role,
  });
};
