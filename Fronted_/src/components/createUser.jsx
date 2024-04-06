import React, { useState } from "react";
import { register_URL } from "../services/urls";
import { Toast } from "./alerts";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(true);

  const handlerSubmmit = () => {
    try {
      //la función fetch para enviar una solicitud POST a la URL de registro (register_URL)
      fetch(register_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        //convertir un objeto JavaScript en una cadena JSON.
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role,
          status: status,
        }),
      })
        .then((response) => {
          //Respuesta servidor
          if (response.status == 200) {
            //alerta libreria Toast
            Toast.fire({
              icon: "success",
              title: "Registro exitoso",
            });
            //Analiza la respuesta y devuelve el JSON
            return response.json();
          }
          if (response.status == 400) {
            //Mensaje de error
            Toast.fire({
              icon: "error",
              title: "Correo ya registrado",
            });
          }
          response.json().then((error) => {
            console.log("Status 400" + JSON.stringify(error.message));
          });
        })
        .then((data) => {
          //Si la respuesta fue correcta, devuelve los datos
          if (data) {
            console.log("Datos" + data);
          }
        })
        //Si ocurre un error
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Crear Usuario</h1>
      <form
        className="flex flex-row w-full card-body"
        onSubmit={handlerSubmmit}
      >
        <div className="form-control w-1/5">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            placeholder="Ingrese nombre"
            className="input input-bordered"
            //Cuando el valor del input cambia, se ejecuta la función proporcionada. 
            //En este caso, la función toma el evento (e) como argumento y actualiza el estado de 
            //name con el valor del input (e.target.value).
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-control w-1/5">
          <label className="label">
            <span className="label-text">Correo</span>
          </label>
          <input
            type="email"
            placeholder="Ingrese un correo"
            className="input input-bordered"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control w-1/5">
          <label className="label">
            <span className="label-text">Contraseña</span>
          </label>
          <input
            type="password"
            placeholder="Ingrese una contraseña"
            className="input input-bordered"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-control w-1/5">
          <label className="label">
            <span className="label-text">Rol</span>
          </label>
          <select
            id="selector"
            className="select select-bordered w-full"
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option selected disabled>
              Selecciona 
            </option>
            <option value="Cocinero">Cocinero</option>
            <option value="Administrador">Administrador</option>
            <option value="Mesero">Mesero</option>
          </select>
        </div>
        <div className="flex w-1/5 items-end align-bottom">
          <button className="btn bg-neutral-700 text-base-100 hover:text-neutral-700 w-full">Guardar</button>
        </div>
      </form>
    </div>
  );
}
