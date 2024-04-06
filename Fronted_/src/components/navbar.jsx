import React from "react";
import { useNavigate } from "react-router-dom";

//Icono
import { IoFastFoodOutline } from "react-icons/io5";

export default function Navbar() {
  // hook useNavigate de React Router para obtener la función navigate, que se utiliza para cambiar la ubicación actual.

  let navigate = useNavigate();

  //Para que se limpie el sesion storage
  const handlerLogoutButton = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    //redirigir al usuario a la página de inicio ("/") y reemplazar la entrada actual en el historial de navegación.
    navigate("/", { replace: true });
  };

  return (
    <div className="flex navbar justify-between bg-base-100 absolute p-4 shadow-lg">
      {/* //Icono */}

      <a className="btn btn-ghost text-2xl">
        <IoFastFoodOutline className="inline-block text-3xl" />
        TAG
      </a>

      {/* //Debe estar autorizada la persona para poder cerrar sesion y por ende trae el token oara verificar */}

      {sessionStorage.getItem("token") ? (
        //Boton para cerrar sesion

        <div className="flex-none space-x-4 dropdown dropdown-end">
          <button
            className="btn  bg-purpleActive hover:bg-purple text-base-100"
            onClick={handlerLogoutButton}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        //En caso de que haya un error
        <div className="flex space-x-4 p-2">
          <button className="btn">
            <span className="loading loading-spinner"></span>
            Cargando
          </button>
        </div>
      )}
    </div>
  );
}
