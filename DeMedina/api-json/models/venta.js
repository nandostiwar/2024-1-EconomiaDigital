const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
    numero_mesa: { type: String, required: true },
    productos: [
        {
            id: { type: Number, required: true },
            nombre: { type: String, required: true },
            precio: { type: Number, required: true }
        }
    ],
    total_venta: { type: Number, required: true },
    estado: { type: String, required: true },
    fecha_hora: { type: Date, required: true },
    email_mesero: { type: String, required: true }
});

const Venta = mongoose.model('Venta', ventaSchema);

module.exports = Venta;