import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NavbarAdmin.css'

function NavbarAdmin() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/" className="navbar-link">Login</Link></li>
        <li className="navbar-separator">|</li>
        <li><Link to="/adminHome" className="navbar-link">Usuarios</Link></li>
        <li className="navbar-separator">|</li>
        <li><Link to="/adminProductos" className="navbar-link">Productos</Link></li>
        <li className="navbar-separator">|</li>
        <li><Link to="/adminPedidos" className="navbar-link">Pedidos</Link></li>
      </ul>
    </nav>
  );
}

export default NavbarAdmin;