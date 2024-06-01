import React, { useState, useEffect } from 'react';
import './styles/CocinaHome.css'

function CocinaHome() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPedidos();
    }, []);

    const fetchPedidos = async () => {
        try {
            const response = await fetch('http://localhost:4000/v1/cocina');
            if (response.ok) {
                const data = await response.json();
                setPedidos(data.pedidos);
            } else {
                console.error('Error al obtener los pedidos:', response.statusText);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los pedidos:', error);
            setLoading(false);
        }
    };

    const handleModificarEstado = async (id, nuevoEstado) => {
        try {
            const response = await fetch(`http://localhost:4000/v1/cocina/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });
            if (response.ok) {
                // Actualizar el estado del pedido en el frontend
                const updatedPedidos = pedidos.map(pedido => {
                    if (pedido.id === id) {
                        return { ...pedido, estado: nuevoEstado };
                    }
                    return pedido;
                });
                setPedidos(updatedPedidos);
            } else {
                console.error('Error al modificar el estado del pedido:', response.statusText);
            }
        } catch (error) {
            console.error('Error al modificar el estado del pedido:', error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="pedidos-container">
        <h2 className="pedidos-title">Pedidos</h2>
        <ul className="pedidos-list">
            {pedidos.map(pedido => (
                <li key={pedido.id} className="pedido-item">
                    <div>Número de Mesa: {pedido.numero_mesa}</div>
                    <div>Productos:</div>
                    <ul className="productos-list">
                        {pedido.productos.map(producto => (
                            <li key={producto.id}>{producto.nombre}</li>
                        ))}
                    </ul>
                    <div>Estado: {pedido.estado}</div>
                    <div className="estado-buttons">
                        <button className="listo-button" onClick={() => handleModificarEstado(pedido.id, 'listo')}>Listo</button>
                        <button className="procesando-button" onClick={() => handleModificarEstado(pedido.id, 'procesando')}>Procesando</button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
    );
}

export default CocinaHome;