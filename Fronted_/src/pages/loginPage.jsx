import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login_URL } from "../services/urls";
import { Toast } from "../components/alerts";

export default function LoginPage() {
  //El hook useNavigate proporciona una función que se puede utilizar para navegar programáticamente a diferentes rutas en la aplicación.
  let navigate = useNavigate();

  //Las siguientes tres líneas utilizan el hook useState de React para declarar y establecer el estado de tres variables
  //Email, Password y Response. Estas variables se utilizan para almacenar
  //y actualizar los valores del correo electrónico, la contraseña y la respuesta del servidor respectivamente.
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Response, setResponse] = useState("");

  //Se ejecuta el handler cuando se envía un formulario. Toma un parámetro e, que representa el evento de envío del formulario.
  const handlerSubmit = (e) => {
    //Evita que se recargue la pagina
    e.preventDefault();
    //El fetch realiza una solicitud HTTP POST a la URL login_URL
    fetch(login_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      //stringify convierte un objeto JavaScript que contiene los valores de Email y Password en una cadena JSON que se enviará al servidor.
      body: JSON.stringify({ email: Email, password: Password }),
    })
      //El método then se utiliza para manejar la respuesta exitosa del servidor.

      .then((response) => {
        if (response.status == 200) {
          Toast.fire({
            icon: "success",
            title: "Inicio de sesion exitoso",
          });
          //response.json() para analizar el cuerpo de la respuesta como JSON.
          return response.json();
        }
        //En caso de que haya error.
        response.json().then((error) => {
          error.error.map((error) => {
            console.log(error);
            Toast.fire({
              icon: "error",
              title: `${error}`,
            });
          });
        });
      })
      //Si existe data, se almacena en el estado del componente utilizando setResponse
      .then((data) => {
        if (data) {
          //El método sessionStorage.setItem se utiliza para almacenar el token, nombre, correo electrónico y estado en el almacenamiento de sesión del navegador.
          setResponse(data);
          console.log(data);
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("name", data.name);
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("status", data.status);

          //se utiliza la función navigate de React Router para navegar a la ruta "/dashboard", reemplazando la URL actual.
          navigate("/dashboard", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Nombre del documento
  useEffect(() => {
    document.title = "Restaurante";
  }, []);

  return (
    <div className="flex md:flex-row h-screen w-full">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex flex-col text-center card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <h1 className="text-2xl font-extrabold pt-9 text-purple">
              Inicio de sesión
            </h1>
            <form
            //Cuando se envie el formulario se llama la funcion handlersubmit
              className="card-body space-y-2 text-start"
              onSubmit={handlerSubmit}
            >
              <div className="form-control">
                <h1>Correo</h1>
                <label className="input input-bordered flex items-center gap-2 mt-1 w-full px-3 py-2 bg-none border border-neutral-500 rounded-md text-sm shadow-sm placeholder-slate-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Correo"
                    //Cuando el valor del campo cambia, la funcion se ejecuta
                    //y cambia el valor actual del campo de entrada
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="form-control">
                <h1>Contraseña</h1>
                <label className="input input-bordered flex items-center gap-2 mt-1 w-full px-3 py-2 bg-none border border-neutral-500 rounded-md text-sm shadow-sm placeholder-slate-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    //Cuando el valor del campo cambia, la funcion se ejecuta
                    //y cambia el valor actual del campo de entrada
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-purple hover:bg-purpleActive text-base-100">
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
