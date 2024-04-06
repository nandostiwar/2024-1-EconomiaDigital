const fs = require('fs/promises');
const path = require('path');

const PEDIDOS_FILE_PATH = path.join(__dirname, '../../db/pedidos.json');
const VENTAS_FILE_PATH = path.join(__dirname, '../../db/ventas.json');

// Obtener todos los pedidos
const getAllPedidos = async (req, res) => {
    try {
        const pedidosData = await fs.readFile(PEDIDOS_FILE_PATH);
        const pedidosJson = JSON.parse(pedidosData);
        res.json(pedidosJson);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
    }
};

// Crear un nuevo pedido
const createPedido = async (req, res) => {
    try {
  
        const pedidosData = await fs.readFile(PEDIDOS_FILE_PATH);
        const pedidosJson = JSON.parse(pedidosData);
        const pedidos = pedidosJson.pedidos;

        const ultimoPedido = pedidos[pedidos.length - 1];
        const idNuevoPedido = ultimoPedido ? ultimoPedido.id + 1 : 1;

        const { numero_mesa, productos, total_venta, estado } = req.body;

        // Obtener la fecha y hora actual
        const fechaHoraActual = new Date().toISOString();

        // Crear el nuevo pedido con el ID obtenido
        const nuevoPedido = { id: idNuevoPedido, numero_mesa, productos, total_venta, estado };

        // Agregar el nuevo pedido al array de pedidos
        pedidos.push(nuevoPedido);

        // Escribir los pedidos actualizados en el archivo JSON
        await fs.writeFile(PEDIDOS_FILE_PATH, JSON.stringify(pedidosJson, null, 2));

        // Leer los datos actuales de ventas
        const ventasData = await fs.readFile(VENTAS_FILE_PATH);
        const ventasJson = JSON.parse(ventasData);

        // Agregar el nuevo pedido al archivo de ventas con la fecha y hora
        ventasJson.ventas.push({ ...nuevoPedido, fecha_hora: fechaHoraActual, email_mesero: req.body.email_mesero });
        await fs.writeFile(VENTAS_FILE_PATH, JSON.stringify(ventasJson, null, 2));


        res.status(201).json({ success: true, message: 'Pedido creado correctamente', pedido: nuevoPedido });
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
        
        const pedidosData = await fs.readFile(PEDIDOS_FILE_PATH);
        const pedidosJson = JSON.parse(pedidosData);
        
        const pedidoIndex = pedidosJson.pedidos.findIndex(pedido => pedido.id === pedidoId);
        if (pedidoIndex !== -1) {
            const pedidoActualizado = { id: pedidoId, numero_mesa, productos, total_venta, estado };
            pedidosJson.pedidos[pedidoIndex] = pedidoActualizado;
            
            // Actualizar el JSON de pedidos
            await fs.writeFile(PEDIDOS_FILE_PATH, JSON.stringify(pedidosJson, null, 2));

            // Leer los datos actuales de ventas
            const ventasData = await fs.readFile(VENTAS_FILE_PATH);
            const ventasJson = JSON.parse(ventasData);
            
            // Buscar el pedido en el JSON de ventas y actualizarlo
            const ventaIndex = ventasJson.ventas.findIndex(venta => venta.id === pedidoId);
            if (ventaIndex !== -1) {
                ventasJson.ventas[ventaIndex] = { ...pedidoActualizado, fecha_hora: ventasJson.ventas[ventaIndex].fecha_hora, email_mesero: ventasJson.ventas[ventaIndex].email_mesero };
                await fs.writeFile(VENTAS_FILE_PATH, JSON.stringify(ventasJson, null, 2));
            }

            res.json({ success: true, message: 'Pedido actualizado correctamente', pedido: pedidosJson.pedidos[pedidoIndex] });
        } else {
            res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el pedido', error: error.message });
    }
};


// Eliminar un pedido
const deletePedido = async (req, res) => {
    try {
        const pedidoId = parseInt(req.params.id);
        
        const pedidosData = await fs.readFile(PEDIDOS_FILE_PATH);
        const pedidosJson = JSON.parse(pedidosData);
        
        const pedidoIndex = pedidosJson.pedidos.findIndex(pedido => pedido.numero_mesa === pedidoId);
        if (pedidoIndex !== -1) {
            const deletedPedido = pedidosJson.pedidos.splice(pedidoIndex, 1);
            await fs.writeFile(PEDIDOS_FILE_PATH, JSON.stringify(pedidosJson, null, 2));
            res.json({ success: true, message: 'Pedido eliminado correctamente', pedido: deletedPedido });
        } else {
            res.status(404).json({ success: false, message: 'Pedido no encontrado' });
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