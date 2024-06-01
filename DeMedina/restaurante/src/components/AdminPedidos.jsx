import { Navigate } from "react-router-dom";
import './styles/AdminPedidos.css';
import NavbarAdmin from "./NavbarAdmin"
import { useState, useEffect } from "react";

function AdminPedidos({ user }) {
    if (user !== 'admin') {
        return <Navigate to="/" />;
    }

    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        fetchVentas();
    }, []);

    const fetchVentas = async () => {
    
        //http://localhost:4000/v1/ventas
        try {
            const response = await fetch('https://de-medina-backend.vercel.app/v1/ventas');
            if (response.ok) {
                const data = await response.json();
                // Mapear las ventas para mostrar solo los campos necesarios
                const ventasResumidas = data.ventas.map(venta => ({
                    email_mesero: venta.email_mesero,
                    productos: venta.productos,
                    total_venta: venta.total_venta,
                    fecha_hora: venta.fecha_hora
                }));
                setVentas(ventasResumidas);
            } else {
                console.error('Error al obtener las ventas:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
        }
    };

    return (
        <div>
        <NavbarAdmin />
        <div className="admin-pedidos-container">
            <h2>Historial de Ventas</h2>
            <ul>
                {ventas.map((venta, index) => (
                    <li key={index}>
                        <div>Email del Mesero: {venta.email_mesero}</div>
                        <div>Total de Venta: ${venta.total_venta}</div>
                        <div>Fecha y Hora: {new Date(venta.fecha_hora).toLocaleString()}</div>
                        <div>Productos:</div>
                        <ul>
                            {venta.productos.map((producto, i) => (
                                <li key={i}>{producto.nombre} - ${producto.precio}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    );
}

export default AdminPedidos;