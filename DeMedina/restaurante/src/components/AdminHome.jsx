
import { Navigate, useNavigate } from "react-router-dom";

import './styles/AdminHome.css';
import NavbarAdmin from "./NavbarAdmin";
import { useState ,useEffect } from "react";


function AdminHome({user}){
    if(user!=='admin'){
        return <Navigate to="/"/>
    }

    const [usuarios, setUsuarios] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');
    const [loading, setLoading] = useState(false);
    const [updatingUserId, setUpdatingUserId] = useState(null);
    const navigate = useNavigate();

    // Obtener la lista de usuarios al cargar el componente
    useEffect(() => {
        fetchUsuarios();
    }, []);

    // Función para obtener la lista de usuarios
    const fetchUsuarios = async () => {
        setLoading(true);
        
        try {
            const response = await fetch('https://de-medina-backend.vercel.app/v1/usuarios');
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data.usuarios);
            } else {
                console.error('Error al obtener usuarios:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
        setLoading(false);
    };

    // Función para crear un nuevo usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://de-medina-backend.vercel.app/v1/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, rol })
            });
            if (response.ok) {
                // Usuario creado exitosamente
                await fetchUsuarios();
                setEmail('');
                setPassword('');
                setRol('');
                alert('Usuario creado exitosamente!');
            } else {
                const data = await response.json();
                alert('Error al crear el usuario: ' + data.message);
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            alert('Error al crear el usuario. Por favor, inténtelo de nuevo.');
        }
    };

    // Función para eliminar un usuario
    const handleDelete = async (userId) => {
        if (window.confirm('¿Está seguro de eliminar este usuario?')) {
            try {
                const response = await fetch(`https://de-medina-backend.vercel.app/v1/usuarios/${userId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    // Usuario eliminado exitosamente
                    await fetchUsuarios();
                    alert('Usuario eliminado exitosamente!');
                } else {
                    const data = await response.json();
                    alert('Error al eliminar el usuario: ' + data.message);
                }
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                alert('Error al eliminar el usuario. Por favor, inténtelo de nuevo.');
            }
        }
    };

    // Función para cargar la información del usuario para actualizar
    const handleUpdate = (userId) => {
        const userToUpdate = usuarios.find(user => user.id === userId);
        if (userToUpdate) {
            setUpdatingUserId(userId);
            setEmail(userToUpdate.email);
            setPassword(userToUpdate.password);
            setRol(userToUpdate.rol);
        } else {
            alert('Usuario no encontrado');
        }
    };

    // Función para actualizar la información del usuario
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://de-medina-backend.vercel.app/v1/usuarios/${updatingUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, rol })
            });
            if (response.ok) {
                await fetchUsuarios();
                setEmail('');
                setPassword('');
                setRol('');
                setUpdatingUserId(null);
                alert('Usuario actualizado exitosamente!');
            } else {
                const data = await response.json();
                alert('Error al actualizar el usuario: ' + data.message);
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            alert('Error al actualizar el usuario. Por favor, inténtelo de nuevo.');
        }
    };

    // Cancelar la actualización de usuario
    const handleCancelUpdate = () => {
        setEmail('');
        setPassword('');
        setRol('');
        setUpdatingUserId(null);
    };

    return (
        <div>
        <NavbarAdmin />

        <div className="admin-container">
        <h2>Crear & Actualizar Usuario</h2>
        <form onSubmit={updatingUserId ? handleUpdateSubmit : handleSubmit}>
            <label>Email:</label>
            <input type="email" class = "input1" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

            <label>Password:</label>
            <input type="password" class = "input2" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />

            <label>Rol:</label>
            <select value={rol} onChange={(e) => setRol(e.target.value)} required>
                <option value="">Seleccionar Rol</option>
                <option value="administrador">Administrador</option>
                <option value="mesero">Mesero</option>
                <option value="cocina">Cocina</option>
            </select><br />

            <button type="submit" disabled={loading}>{updatingUserId ? 'Actualizar Usuario' : 'Crear Usuario'}</button>
            {updatingUserId && <button type="button" onClick={handleCancelUpdate}>Cancelar</button>}
        </form>

        <h2>Lista de Usuarios</h2>
        {loading ? (
            <p>Cargando...</p>
        ) : (
            <ul className="usuarios-list">
                {usuarios.map(usuario => (
                    <li key={usuario.id} className="usuario-item">
                        {usuario.email} - {usuario.rol}
                        <div className="usuario-buttons">
                            <button onClick={() => handleUpdate(usuario.id)}>Editar</button>
                            <button onClick={() => handleDelete(usuario.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
    </div>
    );
}

export default AdminHome;