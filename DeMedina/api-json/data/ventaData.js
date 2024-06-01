const Venta = require('../models/venta');

// Obtener todas las ventas
const getAllVentas = async () => {
    try {
        const ventas = await Venta.find().lean();
        return { ventas };
    } catch (error) {
        throw new Error('Error al obtener las ventas: ' + error.message);
    }
};

// Crear una nueva venta
const createVenta = async (numero_mesa, productos, total_venta, estado, fecha_hora, email_mesero) => {
    try {
        const nuevaVenta = new Venta({
            numero_mesa,
            productos,
            total_venta,
            estado,
            fecha_hora,
            email_mesero
        });

        await nuevaVenta.save();
        return { venta: nuevaVenta.toObject() };
    } catch (error) {
        throw new Error('Error al crear la venta: ' + error.message);
    }
};

// Actualizar una venta
const updateVenta = async (ventaId, updateData) => {
    try {
        const ventaActualizada = await Venta.findByIdAndUpdate(ventaId, updateData, { new: true });
        return { venta: ventaActualizada.toObject() };
    } catch (error) {
        throw new Error('Error al actualizar la venta: ' + error.message);
    }
};

// Eliminar una venta
const deleteVenta = async (ventaId) => {
    try {
        const ventaEliminada = await Venta.findByIdAndDelete(ventaId);
        return { venta: ventaEliminada.toObject() };
    } catch (error) {
        throw new Error('Error al eliminar la venta: ' + error.message);
    }
};

module.exports = {
    getAllVentas,
    createVenta,
    updateVenta,
    deleteVenta
};
