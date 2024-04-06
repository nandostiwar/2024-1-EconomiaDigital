import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WaiterDashboard = () => {
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        // Obtener el total de pedidos desde el backend al cargar el componente
        axios.get('/api/waiter/orders/total')
            .then(response => setTotalOrders(response.data.total))
            .catch(error => console.error('Error fetching total orders:', error));
    }, []);

    return (
        <div>
            <h1>Welcome to Waiter Dashboard</h1>
            <div>
                <h2>Total Orders: {totalOrders}</h2>
            </div>
        </div>
    );
}

export default WaiterDashboard;
