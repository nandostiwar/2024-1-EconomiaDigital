const fs = require('fs/promises');
const path = require('path');

const VENTAS_FILE_PATH = path.join(__dirname, '../../db/ventas.json');

// Obtener todas las ventas
const getAllVentas = async (req, res) => {
    try {
        // Leer el archivo JSON de ventas
        const ventasData = await fs.readFile(VENTAS_FILE_PATH);
        const ventasJson = JSON.parse(ventasData);
        
        // Mapear las ventas para retornar solo los campos necesarios, incluyendo la fecha y hora
        const ventasResumidas = ventasJson.ventas.map(venta => ({
            email_mesero: venta.email_mesero,
            productos: venta.productos,
            total_venta: venta.total_venta,
            fecha_hora: venta.fecha_hora
        }));
        
        // Enviar solo los campos necesarios como respuesta
        res.json({ ventas: ventasResumidas });
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({ message: 'Error al obtener las ventas', error: error.message });
    }
};

module.exports = {
    getAllVentas
};



