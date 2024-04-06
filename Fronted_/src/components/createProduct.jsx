import React, { useState } from "react";
import { products_URL } from "../services/urls";
import { Toast } from "./alerts";

export default function CreateProduct() {
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [status, setStatus] = useState(true);

  const handlerSubmmit = () => {
    try {
      //la función fetch para enviar una solicitud POST a la URL de productos
      fetch(products_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${sessionStorage.getItem("token")}`,
        },
        credentials: "same-origin",
         //convertir un objeto JavaScript en una cadena JSON.
        body: JSON.stringify({
          producto: producto,
          precio: precio,
          status: status,
        }),
      })
        .then((response) => {
          //Respuesta servidor
          if (response.status == 200) {
            Toast.fire({
              icon: "success",
              title: "Registro exitoso",
            });
            //Analiza la respuesta y devuelve el JSON
            return response.json();
          }
          if (response.status == 400) {
            //error
            Toast.fire({
              icon: "error",
              title: "Correo ya existente",
            });
          }
          response.json().then((error) => {
            console.log("Status 400" + JSON.stringify(error.message));
          });
        })
        //Si la respuesta fue correcta, devuelve los datos
        .then((data) => {
          if (data) {
            console.log("Datos" + data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Crear Producto</h1>
      <form
        className="flex flex-row w-full card-body"
        onSubmit={handlerSubmmit}
      >
        <div className="form-control w-1/3">
          <label className="label">
            <span className="label-text">Producto</span>
          </label>
          <input
            type="text"
            placeholder="Ingrese producto"
            className="input input-bordered"
            //Cuando el valor del input cambia, se ejecuta la función proporcionada. 
            //En este caso, la función toma el evento (e) como argumento y actualiza el estado de 
            //name con el valor del input (e.target.value).
            onChange={(e) => setProducto(e.target.value)}
            required
          />
        </div>
        <div className="form-control w-1/3">
          <label className="label">
            <span className="label-text">Precio</span>
          </label>
          <input
            type="text"
            placeholder="Ingrese precio"
            className="input input-bordered"
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="flex w-1/3 items-end align-bottom">
          <button className="btn bg-neutral-700 text-base-100 hover:text-neutral-700 w-full">Guardar</button>
        </div>
      </form>
    </div>
  );
}
