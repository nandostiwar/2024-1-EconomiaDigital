import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CardOrder from "./CardOrder.jsx";

function OrderScreen() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:4000/v1/users/orders");
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const orders = await response.json();
        setOrders(orders.ordenes); // Asegúrate de que coincida con la estructura de tu JSON
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div id="txtSeleccionPage">
        <h3>Pedidos</h3>
      </div>
      <CardOrder orders={orders} />
    </div>
  );
}

export default OrderScreen;
