import React from 'react';
import KitchenDashboard from '../components/Kitchen/KitchenDashboard';
import KitchenOrders from '../components/Kitchen/KitchenOrders';

const KitchenPage = () => {
    return (
        <div>
            <h1>Kitchen Page</h1>
            <KitchenDashboard />
            <KitchenOrders />
        </div>
    );
}

export default KitchenPage;
