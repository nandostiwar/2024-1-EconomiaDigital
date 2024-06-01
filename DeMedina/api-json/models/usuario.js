// const mongoose = require('mongoose');

// const usuarioSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     required: true,
//     unique: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   rol: {
//     type: String,
//     enum: ['administrador', 'usuario','mesero'], // Asegura que el rol sea 'administrador' o 'usuario'
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// const Usuario = mongoose.model('Usuario', usuarioSchema);

// module.exports = Usuario;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    email: { type: String, required: true },
    rol: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);