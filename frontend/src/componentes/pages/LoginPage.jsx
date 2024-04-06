
import { useState } from 'react';
import axios from 'axios';
import './login.css';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      console.log(response.data); // Aquí puedes manejar la respuesta del servidor
      // Redirigir al usuario a la página correspondiente según su rol
    } catch (error) {
      setError('Usuario o contraseña incorrectos');
      console.error('Error de inicio de sesión:', error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Usuario:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
