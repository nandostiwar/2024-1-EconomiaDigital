// const fs = require('fs/promises');
// const path = require('path');
// const Producto = require('../../models/productos');

// const getAllProductos = async (req, res) => {
//     // try {
//     //     const productos = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
//     //     const productosJson = JSON.parse(productos);
//     //     res.json(productosJson);
//     // } catch (error) {
//     //     res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
//     // }
//     try {
//         const productos = await Producto.find(); // Consultar todos los productos en la base de datos
//         res.json(productos); // Enviar la lista de productos como respuesta
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
//     }

// };

// const createProducto = async (req, res) => {
//     try {
//         // Obtener nombre y precio del cuerpo de la solicitud
//         const { nombre, precio } = req.body;

//         // Obtener el ID del último producto
//         const ultimoProducto = await Producto.findOne().sort({ id: -1 });
//         const idNuevoProducto = ultimoProducto ? ultimoProducto.id + 1 : 1;

//         // Crear el nuevo producto con los datos proporcionados y el ID calculado
//         const newProducto = new Producto({ id: idNuevoProducto, nombre, precio });

//         // Guardar el nuevo producto en la base de datos
//         await newProducto.save();

//         // Enviar la respuesta con el nuevo producto creado
//         res.status(201).json({ success: true, message: 'Producto creado correctamente', producto: newProducto });
//     } catch (error) {
//         // Manejo de errores
//         console.error('Error al crear el producto:', error);
//         res.status(500).json({ message: 'Error al crear el producto', error: error.message });
//     }
// };
        
// //         // Leer el archivo JSON de productos
// //         const productosData = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
// //         const productos = JSON.parse(productosData).productos;

// //         // Obtener el ID del último producto
// //         const ultimoProducto = productos[productos.length - 1];
// //         const idNuevoProducto = ultimoProducto ? ultimoProducto.id + 1 : 1;

// //         // Obtener nombre y precio del cuerpo de la solicitud
// //         const { nombre, precio } = req.body;

// //         // Crear el nuevo producto con el ID obtenido
 
// //         const newProducto = { id: idNuevoProducto, nombre, precio };
        
// //         // Agregar el nuevo producto al array de productos
// //         productos.push(newProducto);

// //         // Escribir los productos actualizados en el archivo JSON
// //         await fs.writeFile(path.join(__dirname, '../../db/productos.json')
// //         , JSON.stringify({ productos }, null, 2));

// //         // Enviar la respuesta con el nuevo producto creado
// //         res.status(201).json({ success: true, message: 'Producto creado correctamente', producto: newProducto });
// //     } catch (error) {
// //         // Manejo de errores
// //         console.error('Error al crear el producto:', error);
// //         res.status(500).json({ message: 'Error al crear el producto', error: error.message });
// //     }


// //};


// const updateProducto = async (req, res) => {
//     try {
//         const productId = parseInt(req.params.id);
//         const { nombre, precio } = req.body;

//         const producto = await Producto.findOneAndUpdate(
//             { id: productId },
//             { nombre, precio },
//             { new: true } // Devolver el documento actualizado
//         );

//         if (producto) {
//             res.json({ success: true, message: 'Producto actualizado correctamente', producto });
//         } else {
//             res.status(404).json({ success: false, message: 'Producto no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
//     }

//         // Cargar los datos actualizados del archivo JSON
//     //     const productosData = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
//     //     const productos = JSON.parse(productosData).productos;

//     //     const productIndex = productos.findIndex(product => product.id === productId);
//     //     if (productIndex !== -1) {
//     //         productos[productIndex] = { id: productId, nombre, precio };

//     //         // Escribir los datos actualizados en el archivo JSON
//     //         await fs.writeFile(path.join(__dirname, '../../db/productos.json'), JSON.stringify({ productos }, null, 2));

//     //         res.json({ success: true, message: 'Producto actualizado correctamente', producto: productos[productIndex] });
//     //     } else {
//     //         res.status(404).json({ success: false, message: 'Producto no encontrado' });
//     //     }
//     // } catch (error) {
//     //     res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
//     // }
// };

// const deleteProducto = async (req, res) => {
//     try {
//         const productId = parseInt(req.params.id);

//         const deletedProduct = await Producto.findOneAndDelete({ id: productId });

//         if (deletedProduct) {
//             res.json({ success: true, message: 'Producto eliminado correctamente', producto: deletedProduct });
//         } else {
//             res.status(404).json({ success: false, message: 'Producto no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
//     }
//     //     // Cargar los datos actualizados del archivo JSON
//     //     const productosData = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
//     //     const productos = JSON.parse(productosData).productos;

//     //     const productIndex = productos.findIndex(product => product.id === productId);
//     //     if (productIndex !== -1) {
//     //         const deletedProduct = productos.splice(productIndex, 1);

//     //         // Escribir los datos actualizados en el archivo JSON
//     //         await fs.writeFile(path.join(__dirname, '../../db/productos.json'), JSON.stringify({ productos }, null, 2));

//     //         res.json({ success: true, message: 'Producto eliminado correctamente', producto: deletedProduct });
//     //     } else {
//     //         res.status(404).json({ success: false, message: 'Producto no encontrado' });
//     //     }
//     // } catch (error) {
//     //     res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
//     // }
// };

// module.exports = {
//     getAllProductos,
//     createProducto,
//     updateProducto,
//     deleteProducto
// };









const fs = require('fs/promises');
const path = require('path');
const productosData = require('../../data/productosData');

const getAllProductos = async (req, res) => {
    // try {
    //     const productos = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
    //     const productosJson = JSON.parse(productos);
    //     res.json(productosJson);
    // } catch (error) {
    //     res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    // }

    try {
        const productosJson = await productosData.getAllProductos();
        res.json(productosJson);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

const createProducto = async (req, res) => {
    // try {
    //     // Leer el archivo JSON de productos
    //     const productosData = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
    //     const productos = JSON.parse(productosData).productos;

    //     // Obtener el ID del último producto
    //     const ultimoProducto = productos[productos.length - 1];
    //     const idNuevoProducto = ultimoProducto ? ultimoProducto.id + 1 : 1;

    //     // Obtener nombre y precio del cuerpo de la solicitud
    //     const { nombre, precio } = req.body;

    //     // Crear el nuevo producto con el ID obtenido
 
    //     const newProducto = { id: idNuevoProducto, nombre, precio };
        
    //     // Agregar el nuevo producto al array de productos
    //     productos.push(newProducto);

    //     // Escribir los productos actualizados en el archivo JSON
    //     await fs.writeFile(path.join(__dirname, '../../db/productos.json')
    //     , JSON.stringify({ productos }, null, 2));

    //     // Enviar la respuesta con el nuevo producto creado
    //     res.status(201).json({ success: true, message: 'Producto creado correctamente', producto: newProducto });
    // } catch (error) {
    //     // Manejo de errores
    //     console.error('Error al crear el producto:', error);
    //     res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    // }
    try {
        // Leer los datos actuales de los productos
        const productosJson = await productosData.getAllProductos();
        const productos = productosJson.productos;

        // Obtener el ID del último producto
        const ultimoProducto = productos[productos.length - 1];
        const idNuevoProducto = ultimoProducto ? ultimoProducto.id + 1 : 1;

        // Obtener nombre y precio del cuerpo de la solicitud
        const { nombre, precio } = req.body;

        // Crear el nuevo producto con el ID obtenido
        const newProducto = { id: idNuevoProducto, nombre, precio };

        // Usar el modelo para agregar el nuevo producto
        await productosData.createProducto(newProducto);

        // Enviar la respuesta con el nuevo producto creado
        res.status(201).json({ success: true, message: 'Producto creado correctamente', producto: newProducto });
    } catch (error) {
        // Manejo de errores
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};


const updateProducto = async (req, res) => {
    // try {
    //     const productId = parseInt(req.params.id);
    //     const { nombre, precio } = req.body;

    //     // Cargar los datos actualizados del archivo JSON
    //     const productosData = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
    //     const productos = JSON.parse(productosData).productos;

    //     const productIndex = productos.findIndex(product => product.id === productId);
    //     if (productIndex !== -1) {
    //         productos[productIndex] = { id: productId, nombre, precio };

    //         // Escribir los datos actualizados en el archivo JSON
    //         await fs.writeFile(path.join(__dirname, '../../db/productos.json'), JSON.stringify({ productos }, null, 2));

    //         res.json({ success: true, message: 'Producto actualizado correctamente', producto: productos[productIndex] });
    //     } else {
    //         res.status(404).json({ success: false, message: 'Producto no encontrado' });
    //     }
    // } catch (error) {
    //     res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    // }

    try {
        const productId = parseInt(req.params.id);
        const { nombre, precio } = req.body;

        // Usar el modelo para actualizar el producto
        const productoActualizado = await productosData.updateProducto(productId, { id: productId, nombre, precio });

        if (productoActualizado) {
            res.json({ success: true, message: 'Producto actualizado correctamente', producto: productoActualizado });
        } else {
            res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

const deleteProducto = async (req, res) => {
    // try {
    //     const productId = parseInt(req.params.id);

    //     // Cargar los datos actualizados del archivo JSON
    //     const productosData = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
    //     const productos = JSON.parse(productosData).productos;

    //     const productIndex = productos.findIndex(product => product.id === productId);
    //     if (productIndex !== -1) {
    //         const deletedProduct = productos.splice(productIndex, 1);

    //         // Escribir los datos actualizados en el archivo JSON
    //         await fs.writeFile(path.join(__dirname, '../../db/productos.json'), JSON.stringify({ productos }, null, 2));

    //         res.json({ success: true, message: 'Producto eliminado correctamente', producto: deletedProduct });
    //     } else {
    //         res.status(404).json({ success: false, message: 'Producto no encontrado' });
    //     }
    // } catch (error) {
    //     res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    // }
    try {
        const productId = parseInt(req.params.id);

        // Usar el modelo para eliminar el producto
        const productoEliminado = await productosData.deleteProducto(productId);

        if (productoEliminado) {
            res.json({ success: true, message: 'Producto eliminado correctamente', producto: productoEliminado });
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





