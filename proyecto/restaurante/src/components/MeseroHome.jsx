import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './styles/MeseroHome.css'

function MeseroHome({ user, email }) {
    if (user !== 'mesero' || !user) {
        return <Navigate to="/" />;
    }



    const navigate = useNavigate();
    const [numeroMesa, setNumeroMesa] = useState('');
    const [productosDisponibles, setProductosDisponibles] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [totalVenta, setTotalVenta] = useState('');
    const [pedidosRealizados, setPedidosRealizados] = useState([]);
    const [estadoPedido, setEstadoPedido] = useState('');
    const [editandoPedido, setEditandoPedido] = useState(null);

    useEffect(() => {
        fetchProductosDisponibles();
        fetchPedidosRealizados();
    }, []);

    const fetchProductosDisponibles = async () => {
        try {
            const response = await fetch('http://localhost:4000/v1/productos');
            if (response.ok) {
                const data = await response.json();
                setProductosDisponibles(data.productos);
            } else {
                console.error('Error al obtener productos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const fetchPedidosRealizados = async () => {
        try {
            const response = await fetch('http://localhost:4000/v1/pedidos');
            if (response.ok) {
                const data = await response.json();
                setPedidosRealizados(data.pedidos);
            } else {
                console.error('Error al obtener pedidos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener pedidos:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editandoPedido) {
                const response = await fetch(`http://localhost:4000/v1/pedidos/${editandoPedido.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: editandoPedido.id, numero_mesa: numeroMesa, productos: productosSeleccionados, total_venta: totalVenta, estado: estadoPedido, email_mesero: email })
                });
                if (response.ok) {
                    alert('Pedido editado exitosamente!');
                    setEditandoPedido(null);
                    fetchPedidosRealizados();
                    limpiarFormulario();
                } else {
                    const data = await response.json();
                    alert('Error al editar el pedido: ' + data.message);
                }
            } else {
                const response = await fetch('http://localhost:4000/v1/pedidos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ numero_mesa: numeroMesa, productos: productosSeleccionados, total_venta: totalVenta, estado: estadoPedido, email_mesero: email })
                });
                if (response.ok) {
                    alert('Pedido creado exitosamente!');
                    fetchPedidosRealizados();
                    limpiarFormulario();
                } else {
                    const data = await response.json();
                    alert('Error al crear el pedido: ' + data.message);
                }
            }
        } catch (error) {
            console.error('Error al crear/editar el pedido:', error);
            alert('Error al crear/editar el pedido. Por favor, inténtelo de nuevo.');
        }
    };

    const handleProductoSeleccionado = (e) => {
        const selectedProductoId = parseInt(e.target.value);
        const selectedProducto = productosDisponibles.find(producto => producto.id === selectedProductoId);
        if (selectedProducto) {
            setProductosSeleccionados([...productosSeleccionados, selectedProducto]);
        }
    };

    const handleRemoveProducto = (id) => {
        const updatedProductos = productosSeleccionados.filter(producto => producto.id !== id);
        setProductosSeleccionados(updatedProductos);
    };

    const calcularTotalVenta = () => {
        const total = productosSeleccionados.reduce((acc, producto) => acc + parseFloat(producto.precio), 0);
        setTotalVenta(total);
    };

    const limpiarFormulario = () => {
        setNumeroMesa('');
        setProductosSeleccionados([]);
        setTotalVenta('');
        setEstadoPedido('');
    };

    useEffect(() => {
        calcularTotalVenta();
    }, [productosSeleccionados]);

    const handleEditarPedido = (pedido) => {
        setEditandoPedido(pedido);
        setNumeroMesa(pedido.numero_mesa);
        setProductosSeleccionados(pedido.productos);
        setTotalVenta(pedido.total_venta);
        setEstadoPedido(pedido.estado);
    };

    const handleCancelarEdicion = () => {
        setEditandoPedido(null);
        limpiarFormulario();
    };


    return (
        <div className="mesero-container">
        <h2>Realizar Pedido</h2>
        <form onSubmit={handleSubmit}>
            <label>Número de Mesa:</label>
            <input type="text"  value={numeroMesa} onChange={(e) => setNumeroMesa(e.target.value)} required /><br />

            <label>Productos:</label>
            <select onChange={handleProductoSeleccionado}>
                <option value="">Seleccionar Producto</option>
                {productosDisponibles.map(producto => (
                    <option key={producto.id} value={producto.id}>{producto.nombre} - ${producto.precio}</option>
                ))}
            </select><br />

            <label>Productos Seleccionados:</label>
            <ul>
                {productosSeleccionados.map(producto => (
                    <li key={producto.id}>{producto.nombre} - ${producto.precio} <button type="button" onClick={() => handleRemoveProducto(producto.id)}>Quitar</button></li>
                ))}
            </ul>

            <label>Total de Venta:</label>
            <input type="number" value={totalVenta} onChange={(e) => setTotalVenta(e.target.value)} required readOnly /><br />

            <label>Estado del Pedido:</label>
            <select value={estadoPedido} onChange={(e) => setEstadoPedido(e.target.value)}>
                <option value=""></option>
                <option value="procesando">Procesando</option>
                <option value="listo">Listo</option>
            </select><br />

            <button type="submit">{editandoPedido ? 'Editar Pedido' : 'Crear Pedido'}</button>
            {editandoPedido && <button type="button" onClick={handleCancelarEdicion}>Cancelar Edición</button>}
        </form>

        <h2>Pedidos Realizados</h2>
        <ul>
            {pedidosRealizados.map((pedido, index) => (
                <li key={index}>
                    <div>Número de Mesa: {pedido.numero_mesa}</div>
                    <div>Total de Venta: ${pedido.total_venta}</div>
                    <div>Productos:
                        <ul>
                            {pedido.productos.map(producto => (
                                <li key={producto.id}>{producto.nombre} - ${producto.precio}</li>
                            ))}
                        </ul>
                    </div>
                    <div>Estado del Pedido: {pedido.estado}</div>
                    <button type="button" onClick={() => handleEditarPedido(pedido)}>Editar</button>
                </li>
            ))}
        </ul>
    </div>
    );
}

export default MeseroHome;
