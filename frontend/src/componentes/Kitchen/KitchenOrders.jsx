import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KitchenOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Obtener la lista de pedidos desde el backend al cargar el componente
        axios.get('/api/orders')
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    const markOrderAsReady = (orderId) => {
        // Lógica para marcar un pedido como listo
        axios.put(`/api/orders/${orderId}`, { status: 'Ready' })
            .then(response => {
                const updatedOrders = orders.map(order =>
                    order.id === orderId ? { ...order, status: 'Ready' } : order
                );
                setOrders(updatedOrders);
            })
            .catch(error => console.error('Error marking order as ready:', error));
    };

    return (
        <div>
            <h1>Kitchen Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <h3>Order #{order.id}</h3>
                        <p>Status: {order.status}</p>
                        <button onClick={() => markOrderAsReady(order.id)}>Mark as Ready</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default KitchenOrders;
