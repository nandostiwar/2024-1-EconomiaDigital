const Producto = require('../models/productos');

// Obtener todos los productos
const getAllProductos = async () => {
    const productos = await Producto.find();
    return { productos };
};

// Crear un nuevo producto
const createProducto = async (newProducto) => {
    const producto = new Producto(newProducto);
    await producto.save();
    return newProducto;
};

// Actualizar un producto
const updateProducto = async (productId, updatedProducto) => {
    const producto = await Producto.findOneAndUpdate({ id: productId }, updatedProducto, { new: true });
    return producto;
};

// Eliminar un producto
const deleteProducto = async (productId) => {
    const producto = await Producto.findOneAndDelete({ id: productId });
    return producto;
};

module.exports = {
    getAllProductos,
    createProducto,
    updateProducto,
    deleteProducto
};
