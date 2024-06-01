const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');

// Obtener todos los pedidos
const getAllPedidos = async () => {
    const pedidos = await Pedido.find().populate('productos');
    return { pedidos };
};

// Crear un nuevo pedido
const createPedido = async (newPedido) => {
    const pedido = new Pedido(newPedido);
    await pedido.save();
    return newPedido;
};

// Actualizar un pedido
const updatePedido = async (pedidoId, updatedPedido) => {
    const pedido = await Pedido.findOneAndUpdate({ id: pedidoId }, updatedPedido, { new: true });
    return pedido;
};

// Eliminar un pedido
const deletePedido = async (pedidoId) => {
    const pedido = await Pedido.findOneAndDelete({ id: pedidoId });
    return pedido;
};

// Modificar estado de un pedido
const modifyPedidoStatus = async (pedidoId, estado) => {
    const pedido = await Pedido.findOneAndUpdate({ id: pedidoId }, { estado: estado }, { new: true });
    return pedido;
};

module.exports = {
    getAllPedidos,
    createPedido,
    updatePedido,
    deletePedido,
    modifyPedidoStatus
};
