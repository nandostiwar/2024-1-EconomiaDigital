const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    numero_mesa: { type: String, required: true },
    productos: [
        {
            id: { type: Number, required: true },
            nombre: { type: String, required: true },
            precio: { type: Number, required: true },
        },
    ],
    total_venta: { type: Number, required: true },
    estado: { type: String, required: true },
});

module.exports = mongoose.model('Pedido', PedidoSchema);
