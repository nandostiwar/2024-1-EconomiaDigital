const fs = require('fs/promises');
const path = require('path');
// const pedidosData = require('../data/pedidosData');
const pedidosData = require('../../data/pedidoData'); 


// Obtener todos los pedidos
const getAllPedidos = async (req, res) => {
    try {
        const pedidosJson = await pedidosData.getAllPedidos();
        res.json(pedidosJson);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
    }
};

// Crear un nuevo pedido
const createPedido = async (req, res) => {
    
    try {
        const { numero_mesa, productos, total_venta, estado, email_mesero } = req.body;

        // Obtener la fecha y hora actual
        // const fechaHoraActual = new Date().toISOString();

        // Crear el nuevo pedido
        const newPedido = await pedidosData.createPedido(numero_mesa, productos, total_venta, estado);

        // // Agregar el nuevo pedido al archivo de ventas con la fecha y hora
        // const venta = {
        //     ...newPedido.pedidos[0],
        //     fecha_hora: fechaHoraActual,
        //     email_mesero
        // };

        // await pedidosData.createVenta(venta);

        res.status(201).json({ success: true, message: 'Pedido creado correctamente', pedido: newPedido.pedidos[0] });
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        res.status(500).json({ message: 'Error al crear el pedido', error: error.message });
    }
};

// Actualizar un pedido
const updatePedido = async (req, res) => {
    try {
        const pedidoId = parseInt(req.params.id);
        const { numero_mesa, productos, total_venta, estado } = req.body;

        const updatedPedido = await pedidosData.updatePedido(pedidoId, numero_mesa, productos, total_venta, estado);

        if (updatedPedido.pedidos[0]) {
            res.json({ success: true, message: 'Pedido actualizado correctamente', pedido: updatedPedido.pedidos[0] });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el pedido', error: error.message });
    }
};

// Eliminar un pedido
const deletePedido = async (req, res) => {
    try {
        const pedidoId = parseInt(req.params.id);
        const deletedPedido = await pedidosData.deletePedido(pedidoId);

        if (deletedPedido.pedidos[0]) {
            res.json({ success: true, message: 'Pedido eliminado correctamente', pedido: deletedPedido.pedidos[0] });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el pedido', error: error.message });
    }
};

module.exports = {
    getAllPedidos,
    createPedido,
    updatePedido,
    deletePedido
};