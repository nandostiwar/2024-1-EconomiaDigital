import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Users from "../components/users";
import Products from "../components/products";
import Orders from "../components/orders";
import CreateUser from "../components/createUser";
import CreateOrders from "../components/createOrders";
import CreateProduct from "../components/createProduct";
import { Domain } from "../services/urls";

//
export default function DashBoard() {
  //Se crea la variable activeTab y una función de actualización llamada setActiveTab.
  //Esta función handlerTab se ejecuta cuando se hace clic en la pestaña correspondiente.
  const [activeTab, setActiveTab] = useState("tab1");
  //pestaña usuario
  const handlerTab1 = () => {
    setActiveTab("tab1");
  };
  //pestaña prodcuto
  const handlerTab2 = () => {
    setActiveTab("tab2");
  };

  const handlerTab3 = () => {
    setActiveTab("tab3");
  };

  //Nombre del documento
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  // Se usa el  useEffect para realizar una solicitud GET a la ruta "/profile"
  useEffect(() => {
    //La variable Domain es la URL válida que apunta al servidor.
    fetch(Domain + "/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${sessionStorage.getItem("token")}`,
      },
      //.then() se encadena después de la solicitud y maneja la respuesta de la solicitud
    }).then((response) => {
      if (response.status == 200) {
        console.log("Seccion activa");
      } else {
        //Se borra el sessionStorage para eliminar cualquier token de sesión almacenado.
        sessionStorage.clear();
      }
      //Se devuelve los datos de la respuesta en formato JSON
      return response.json();
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col h-screen w-full">
        <div className="flex  w-full bg-base-200 pt-24">
          <ul className="flex flex-row w-screen justify-between space-x-4 space-y-0 transition-all">
            {/* navegacion */}
            <li
              //la función handlerTab1 se ejecutará cuando se haga clic en el elemento.
              onClick={handlerTab1}
              className={
                activeTab == "tab1"
                  ? "flex justify-center w-full items-center rounded-lg shadow-sm lg:justify-start bg-purple text-base-100 lg:rounded-lg lg:shadow-md p-4 "
                  : "flex justify-center w-full items-center lg:justify-start rounded-lg shadow-sm p-4 hover:bg-base-300"
              }
            >
              Usuarios
            </li>
            <li
              //la función handlerTab2 se ejecutará cuando se haga clic en el elemento.
              onClick={handlerTab2}
              className={
                activeTab == "tab2"
                  ? "flex justify-center w-full items-center rounded-lg shadow-sm lg:justify-start  bg-purple text-base-100 lg:rounded-lg lg:shadow-md p-4"
                  : "flex justify-center w-full items-center lg:justify-start rounded-lg shadow-sm p-4 hover:bg-base-300"
              }
            >
              Productos
            </li>
            <li
              onClick={handlerTab3}
              ////la función handlerTab3 se ejecutará cuando se haga clic en el elemento.
              className={
                activeTab == "tab3"
                  ? "flex justify-center w-full items-center rounded-lg shadow-sm lg:justify-start bg-purple text-base-100 lg:rounded-lg lg:shadow-md p-4"
                  : "flex justify-center w-full items-center lg:justify-start rounded-lg shadow-sm p-4 hover:bg-base-300"
              }
            >
              Ordenes
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-screen p-8">
          {/* //Si el activaTab es igual a 1, se renderiza la creacion de usuario */}
          {activeTab == "tab1" ? (
            <CreateUser />
          ) : activeTab == "tab2" ? (
            <CreateProduct />
          ) : activeTab == "tab3" ? (
            <CreateOrders />
          ) : (
            <div/>
          )}
        </div>
        {/* //Si el activaTab es igual a tal, se renderiza la tabla correspondiente*/}
        <div className="w-auto">
          {activeTab == "tab1" ? (
            <Users />
          ) : activeTab == "tab2" ? (
            <Products />
          ) : activeTab == "tab3" ? (
            <Orders />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
