import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: ''
    });

    useEffect(() => {
        // Obtener la lista de productos desde el backend al cargar el componente
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const addProduct = () => {
        // Lógica para agregar un nuevo producto
        axios.post('/api/products', newProduct)
            .then(response => {
                setProducts([...products, response.data]);
                setNewProduct({
                    name: '',
                    price: ''
                });
            })
            .catch(error => console.error('Error adding product:', error));
    };

    const handleInputChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h1>Product Management</h1>
            <div>
                <h2>Add New Product</h2>
                <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Product Name" />
                <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Product Price" />
                <button onClick={addProduct}>Add Product</button>
            </div>
            <div>
                <h2>Product List</h2>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.name} - ${product.price}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminProducts;
