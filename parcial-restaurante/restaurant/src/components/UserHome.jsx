import { Navigate, useNavigate } from "react-router-dom";
import "./styles/UserHome.css";
import TextSigno from "./TextSigno.jsx";
import { useState, useEffect } from "react";

function UserHome({ user }) {
//   if (user !== "user" || !user) {
//     return <Navigate to="/" />;
//   }
  const home = useNavigate();
  const [textoSigno, setTextoSigno] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/v1/users");
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const users = await response.json();
        setUsers(users.users); // Asegúrate de que coincida con la estructura de tu JSON
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  async function handleSelect(event) {
    const signo = event.target.value;
    if (signo !== "0") {
      fetch(`http://localhost:4000/v1/signos/${signo}`)
        .then((response) => response.json())
        .then((responseData) => setTextoSigno(responseData));
    }
  }

  return (
    <div className="container">
      <div id="txtSeleccionPage">
        <h3>Selecciona tu signo zodiacal</h3>
      </div>
      <select id="selectSignos" onClick={handleSelect}>
        <option value="0">Seleciona un signo zodiacal</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} - Rol: {user.role}
          </option>
        ))}
      </select>
      <TextSigno texto={textoSigno} />
      {/* <button id="btnHome" onClick={home("/")}>
        Home
      </button> */}
    </div>
  );
}

export default UserHome;
