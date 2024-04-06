import { useEffect, useState } from "react";
import { Domain } from "../services/urls.jsx";

export default function useFetch(url, method, { body } = {}) {
  // variable de estado llamada Data y una función setData para actualizar su valor.
  const [Data, setData] = useState();
  const [Error, setError] = useState();

  useEffect(() => {
    try {
      //URL donde se van a realizar las solicitudes
      //a función fetch se llama con la URL completa (que se construye concatenando Domain y url), 
      //el método HTTP, los encabezados y el cuerpo de la solicitud. 
      fetch(Domain + url, {
        method: `${method}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${sessionStorage.getItem("token")}`,
        },
        body: body,
      })
        .then((response) => {
          return response.json();
        })
        .then((d) => {
          setData(d);
        })
        .catch((error) => {
          setError(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { Data, Error };
}
