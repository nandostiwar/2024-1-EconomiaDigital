const fs = require('fs/promises');
const path = require('path');

const PEDIDOS_FILE_PATH = path.join(__dirname, '../../db/pedidos.json');

// Función para modificar el estado de un pedido en el JSON de pedidos
const modificarEstadoPedido = async (req, res) => {
    try {
        const pedidoId = parseInt(req.params.id);
        const { estado } = req.body;

        // Leer el archivo JSON de pedidos
        const pedidosData = await fs.readFile(PEDIDOS_FILE_PATH);
        const pedidosJson = JSON.parse(pedidosData);
        
        // Buscar el pedido por su ID
        const pedidoIndex = pedidosJson.pedidos.findIndex(pedido => pedido.id === pedidoId);
        if (pedidoIndex !== -1) {
            // Actualizar el estado del pedido
            pedidosJson.pedidos[pedidoIndex].estado = estado;

            // Actualizar el JSON de pedidos
            await fs.writeFile(PEDIDOS_FILE_PATH, JSON.stringify(pedidosJson, null, 2));

            res.json({ success: true, message: 'Estado del pedido actualizado correctamente' });
        } else {
            res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado del pedido', error: error.message });
    }
};

module.exports = {
    modificarEstadoPedido
};