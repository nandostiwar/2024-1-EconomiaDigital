

const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true }
});

const Producto = mongoose.model('Producto', ProductoSchema);

module.exports = Producto;

