import React, { useState } from 'react';
import './styles/Form.css';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://de-medina-backend.vercel.app/v1/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            console.log(data.user.email)
            console.log(data.user.rol)

            if (response.ok) {
                // Redirigir al usuario según su rol
                if (data.user.rol === 'administrador') {
                    callback({ role: 'admin' });
                    goTo('/adminHome');
                } else if (data.user.rol === 'mesero') {
                    callback({ role: 'mesero', email: data.user.email });
                    goTo('/meseroHome');

                } else if (data.user.rol === "cocina") {
                    callback({role: 'cocina'});
                    goTo('/cocinaHome');
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
            <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
    );
}

export default Form;