const fs = require('fs/promises');
const path = require('path');
const productosData = require('../../db/productos.json');

const getAllProductos = async (req, res) => {
    try {
        const productos = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
        const productosJson = JSON.parse(productos);
        res.json(productosJson);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

const createProducto = async (req, res) => {
    try {
        // Leer el archivo JSON de productos
        const productosData = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
        const productos = JSON.parse(productosData).productos;

        // Obtener el ID del último producto
        const ultimoProducto = productos[productos.length - 1];
        const idNuevoProducto = ultimoProducto ? ultimoProducto.id + 1 : 1;

        // Obtener nombre y precio del cuerpo de la solicitud
        const { nombre, precio } = req.body;

        // Crear el nuevo producto con el ID obtenido
 
        const newProducto = { id: idNuevoProducto, nombre, precio };
        
        // Agregar el nuevo producto al array de productos
        productos.push(newProducto);

        // Escribir los productos actualizados en el archivo JSON
        await fs.writeFile(path.join(__dirname, '../../db/productos.json')
        , JSON.stringify({ productos }, null, 2));

        // Enviar la respuesta con el nuevo producto creado
        res.status(201).json({ success: true, message: 'Producto creado correctamente', producto: newProducto });
    } catch (error) {
        // Manejo de errores
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};


const updateProducto = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { nombre, precio } = req.body;

        // Cargar los datos actualizados del archivo JSON
        const productosData = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
        const productos = JSON.parse(productosData).productos;

        const productIndex = productos.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            productos[productIndex] = { id: productId, nombre, precio };

            // Escribir los datos actualizados en el archivo JSON
            await fs.writeFile(path.join(__dirname, '../../db/productos.json'), JSON.stringify({ productos }, null, 2));

            res.json({ success: true, message: 'Producto actualizado correctamente', producto: productos[productIndex] });
        } else {
            res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

const deleteProducto = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        // Cargar los datos actualizados del archivo JSON
        const productosData = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
        const productos = JSON.parse(productosData).productos;

        const productIndex = productos.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            const deletedProduct = productos.splice(productIndex, 1);

            // Escribir los datos actualizados en el archivo JSON
            await fs.writeFile(path.join(__dirname, '../../db/productos.json'), JSON.stringify({ productos }, null, 2));

            res.json({ success: true, message: 'Producto eliminado correctamente', producto: deletedProduct });
        } else {
            res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};

module.exports = {
    getAllProductos,
    createProducto,
    updateProducto,
    deleteProducto
};





