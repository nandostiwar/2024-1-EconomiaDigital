import React from 'react';
import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminProducts from '../components/Admin/AdminProducts';

const AdminPage = () => {
    return (
        <div>
            <h1>Admin Page</h1>
            <AdminDashboard />
            <AdminProducts />
        </div>
    );
}

export default AdminPage;
