// const Pedido = require('../models/pedidos');
// const Producto = require('../models/Producto');



const Pedido = require('../models/pedidos');

// Obtener todos los pedidos
const getAllPedidos = async () => {
    const pedidos = await Pedido.find().lean();
    return { pedidos };
};

// Obtener un pedido por ID
const getPedidoById = async (id) => {
    const pedido = await Pedido.findById(id).lean();
    return { pedidos: [pedido] };
};

// Crear un nuevo pedido
const createPedido = async (numero_mesa, productos, total_venta, estado) => {
    const ultimoPedido = await Pedido.findOne().sort({ id: -1 }).lean();
    const nuevoIdPedido = ultimoPedido ? ultimoPedido.id + 1 : 1;

    const newPedido = new Pedido({
        id: nuevoIdPedido,
        numero_mesa,
        productos,
        total_venta,
        estado,
    });

    await newPedido.save();
    return { pedidos: [newPedido.toObject()] };
};

// Actualizar un pedido
const updatePedido = async (pedidoId, numero_mesa, productos, total_venta, estado) => {
    const pedido = await Pedido.findOneAndUpdate(
        { id: pedidoId },
        { numero_mesa, productos, total_venta, estado },
        { new: true }
    ).lean();

    return { pedidos: [pedido] };
};

// Eliminar un pedido
const deletePedido = async (pedidoId) => {
    const pedido = await Pedido.findOneAndDelete({ id: pedidoId }).lean();
    return { pedidos: [pedido] };
};


// Actualizar el estado de un pedido
const updateEstadoPedido = async (pedidoId, estado) => {
    const pedido = await Pedido.findOneAndUpdate(
        { id: pedidoId },
        { estado },
        { new: true }
    ).lean();
    return { pedidos: [pedido] };
}


module.exports = {
    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
    updateEstadoPedido,
};
// // Obtener todos los pedidos
// const getAllPedidos = async () => {
//     const pedidos = await Pedido.find().populate('productos');
//     return { pedidos };
// };

// // Crear un nuevo pedido
// const createPedido = async (newPedido) => {
//     const pedido = new Pedido(newPedido);
//     await pedido.save();
//     return newPedido;
// };

// // Actualizar un pedido
// const updatePedido = async (pedidoId, updatedPedido) => {
//     const pedido = await Pedido.findOneAndUpdate({ id: pedidoId }, updatedPedido, { new: true });
//     return pedido;
// };

// // Eliminar un pedido
// const deletePedido = async (pedidoId) => {
//     const pedido = await Pedido.findOneAndDelete({ id: pedidoId });
//     return pedido;
// };

// // Modificar estado de un pedido
// const modifyPedidoStatus = async (pedidoId, estado) => {
//     const pedido = await Pedido.findOneAndUpdate({ id: pedidoId }, { estado: estado }, { new: true });
//     return pedido;
// };

// module.exports = {
//     getAllPedidos,
//     createPedido,
//     updatePedido,
//     deletePedido,
//     modifyPedidoStatus
// };
