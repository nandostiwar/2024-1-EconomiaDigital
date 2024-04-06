import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KitchenDashboard = () => {
    const [pendingOrders, setPendingOrders] = useState([]);

    useEffect(() => {
        // Obtener los pedidos pendientes desde el backend al cargar el componente
        axios.get('/api/kitchen/pending')
            .then(response => setPendingOrders(response.data))
            .catch(error => console.error('Error fetching pending orders:', error));
    }, []);

    const handleOrderStatusUpdate = (orderId, newStatus) => {
        // Actualizar el estado del pedido en el backend
        axios.put(`/api/kitchen/${orderId}`, { status: newStatus })
            .then(response => {
                // Actualizar la lista de pedidos pendientes después de la actualización
                const updatedOrders = pendingOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                );
                setPendingOrders(updatedOrders);
            })
            .catch(error => console.error('Error updating order status:', error));
    };

    return (
        <div>
            <h1>Welcome to Kitchen Dashboard</h1>
            <div>
                <h2>Pending Orders</h2>
                <ul>
                    {pendingOrders.map(order => (
                        <li key={order.id}>
                            <p>Table: {order.table}</p>
                            <p>Products: {order.products.map(product => product.name).join(', ')}</p>
                            <button onClick={() => handleOrderStatusUpdate(order.id, 'Ready')}>
                                Mark as Ready
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default KitchenDashboard;
