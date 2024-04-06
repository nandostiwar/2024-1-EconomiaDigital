import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WaiterOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Obtener los pedidos del mesero desde el backend al cargar el componente
        axios.get('/api/waiter/orders')
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching waiter orders:', error));
    }, []);

    return (
        <div>
            <h1>Waiter Orders</h1>
            <div>
                <h2>Orders</h2>
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            <p>Table: {order.table}</p>
                            <p>Products: {order.products.map(product => product.name).join(', ')}</p>
                            <p>Status: {order.status}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default WaiterOrders;
