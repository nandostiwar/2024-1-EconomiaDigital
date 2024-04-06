import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles/AdminProductos.css';
import NavbarAdmin from "./navbarAdmin";

function AdminProductos() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [loading, setLoading] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/v1/productos');
      if (response.ok) {
        const data = await response.json();
        setProductos(data.productos);
      } else {
        console.error('Error al obtener productos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(precio) < 0) {
      alert('El precio no puede ser negativo');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/v1/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, precio })
      });
      if (response.ok) {
        await fetchProductos();
        setNombre('');
        setPrecio('');
        alert('Producto creado exitosamente!');
      } else {
        const data = await response.json();
        alert('Error al crear el producto: ' + data.message);
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
      alert('Error al crear el producto. Por favor, inténtelo de nuevo.');
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(precio) < 0) {
      alert('El precio no puede ser negativo');
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/v1/productos/${updatingProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, precio })
      });
      if (response.ok) {
        await fetchProductos();
        setNombre('');
        setPrecio('');
        setUpdatingProductId(null);
        alert('Producto actualizado exitosamente!');
      } else {
        const data = await response.json();
        alert('Error al actualizar el producto: ' + data.message);
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert('Error al actualizar el producto. Por favor, inténtelo de nuevo.');
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:4000/v1/productos/${productId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          await fetchProductos();
          alert('Producto eliminado exitosamente!');
        } else {
          const data = await response.json();
          alert('Error al eliminar el producto: ' + data.message);
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto. Por favor, inténtelo de nuevo.');
      }
    }
  };

  const handleUpdate = (productId) => {
    const productToUpdate = productos.find(product => product.id === productId);
    if (productToUpdate) {
      setUpdatingProductId(productId);
      setNombre(productToUpdate.nombre);
      setPrecio(productToUpdate.precio);
    } else {
      alert('Producto no encontrado');
    }
  };

  const handleCancelUpdate = () => {
    setNombre('');
    setPrecio('');
    setUpdatingProductId(null);
  };

  return (
    <div>
      <NavbarAdmin></NavbarAdmin>
      <div className="admin-productos-container">
        <h2>Crear & Actualizar Producto</h2>
        <form onSubmit={updatingProductId ? handleUpdateSubmit : handleSubmit}>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required /><br />

          <label>Precio:</label>
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required /><br />

          <button type="submit" disabled={loading}>{updatingProductId ? 'Actualizar Producto' : 'Crear Producto'}</button>
          {updatingProductId && <button type="button" onClick={handleCancelUpdate}>Cancelar</button>}
        </form>

        <h2>Lista de Productos</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ul>
            {productos.map(producto => (
              <li key={producto.id}>
                {producto.nombre} - {producto.precio}
                <div className="usuario-buttons">
                  <button onClick={() => handleUpdate(producto.id)}>Editar</button>
                  <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminProductos;
