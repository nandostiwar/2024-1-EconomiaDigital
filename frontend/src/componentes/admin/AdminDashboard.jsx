import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [totalSales, setTotalSales] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        // Obtener el total de ventas y productos desde el backend al cargar el componente
        axios.get('/api/sales/total')
            .then(response => setTotalSales(response.data.total))
            .catch(error => console.error('Error fetching total sales:', error));

        axios.get('/api/products/total')
            .then(response => setTotalProducts(response.data.total))
            .catch(error => console.error('Error fetching total products:', error));
    }, []);

    return (
        <div>
            <h1>Welcome to Admin Dashboard</h1>
            <div>
                <h2>Total Sales: {totalSales}</h2>
                <h2>Total Products: {totalProducts}</h2>
            </div>
        </div>
    );
}

export default AdminDashboard;
