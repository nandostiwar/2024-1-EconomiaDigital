import React from 'react';
import WaiterDashboard from '../components/Waiter/WaiterDashboard';
import WaiterOrders from '../components/Waiter/WaiterOrders';

const WaiterPage = () => {
    return (
        <div>
            <h1>Waiter Page</h1>
            <WaiterDashboard />
            <WaiterOrders />
        </div>
    );
}

export default WaiterPage;
