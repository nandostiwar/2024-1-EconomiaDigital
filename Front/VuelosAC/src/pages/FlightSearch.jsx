import React, { useState, useEffect } from "react";

export default function FlightSearch() {
  //Creamos los estados
  //El primero contendra los paises y el segundo las letras ingresadas por el usuario
  const [countries, setCountries] = useState([]);
  const [flights, setFlights] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [handlerOrigin, setHandlerOrigin] = useState(1);
  const [handlerDestination, setHandlerDestination] = useState(1);
  const [result, setResult] = useState([]);
  const [resultDestination, setResultDestination] = useState([]);
  const [searchOrigin, setSearchOrigin] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [aviableFlights, setAviableFligts] = useState([]);
  const [hasFlights, setHasFlights] = useState(0);
  let VuelosFiltrados = [];

  //creamos una constante llamada URI para almacenar la ruta del API
  const URI = "http://localhost:8000/api/";

  //Creamos la funcion para consultar el API y traer los paises
  const getCountries = async () => {
    try {
      const response = await fetch(URI + "countries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (countries) {
        data.map((x) => {
          countries.push(x.name);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFlights = async () => {
    try {
      const response = await fetch(URI + "flights", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFlights(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Creamos la funcion que escucha los cambios en el input de origen
  const SearcherOrigin = (e) => {
    setSearchOrigin(e.target.value);

    const valor = e.target.value;
    const Filtrado = (arr, query) => {
      return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
    };
    if (valor != "") {
      setResult(Filtrado(countries, valor));
      setHandlerOrigin(0);
    } else {
      setHandlerOrigin(1);
    }
    console.log(valor);
    console.log(result);
  };

  //Creamos la funcion que escucha los cambios en el input de destino
  const SearcherDestination = (e) => {
    setSearchDestination(e.target.value);

    const valor = e.target.value;
    const Filtrado = (arr, query) => {
      return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
    };
    if (valor != "") {
      setResultDestination(Filtrado(countries, valor));
      setHandlerDestination(0);
    } else {
      setHandlerDestination(1);
    }
    console.log(valor);
    console.log(resultDestination);
  };

  const HandlerButton = () => {
    const Filtrado = (arr, query) => {
      return arr.filter((el) =>
        el.origin.toLowerCase().includes(query.toLowerCase())
      );
    };

    const metodo = Filtrado(flights, selectedOrigin);
    metodo.map((x) => {
      VuelosFiltrados.push(x);
    });

    if (VuelosFiltrados.length != 0) {
      console.log(VuelosFiltrados);
      VuelosFiltrados.map((x) => {
        console.log(x.origin);
      });
      //   setHasFlights(1);
    } else {
      console.log("No hay datos");
      console.log(aviableFlights);
    }
  };

  //Se va a utilizar un hook llamado useEffect para ejecutar automaticamente la funcion
  useEffect(() => {
    getCountries();
    getFlights();
  }, []);

  return (
    <div className="flex flex-col w-full h-full pt-6 space-y-8">
      <div className="flex flex-row justify-center items-center space-x-4">
        <div>
          <input
            type="text"
            value={searchOrigin}
            onChange={SearcherOrigin}
            placeholder="Origen"
            className="input input-bordered w-80"
          />
          {handlerOrigin == 1 ? (
            <div className="hidden"></div>
          ) : (
            <ul className="absolute z-30 menu menu-sm bg-base-200 w-80 h-auto max-h-max rounded-box overflow-y-auto">
              {result ? (
                <li className="text-black">
                  {result.map((x) => {
                    return (
                      <button
                        onClick={(e) => {
                          setSelectedOrigin(e.target.value);
                          setSearchOrigin(e.target.value);
                          setHandlerOrigin(1);
                        }}
                        value={x}
                        id={x}
                      >
                        {x}
                      </button>
                    );
                  })}
                </li>
              ) : (
                <li></li>
              )}
            </ul>
          )}
        </div>
        <div>TO</div>
        <div>
          <input
            type="text"
            value={searchDestination}
            onChange={SearcherDestination}
            placeholder="Destino"
            className="input input-bordered"
          />
          {handlerDestination == 1 ? (
            <div className="hidden"></div>
          ) : (
            <ul className="absolute z-30 menu menu-sm bg-base-200 w-80 h-auto max-h-max rounded-box overflow-y-auto">
              {resultDestination ? (
                <li className="text-black">
                  {resultDestination.map((x) => {
                    return (
                      <button
                        onClick={(e) => {
                          setSelectedDestination(e.target.value);
                          setSearchDestination(e.target.value);
                          setHandlerDestination(1);
                        }}
                        value={x}
                        id={x}
                      >
                        {x}
                      </button>
                    );
                  })}
                </li>
              ) : (
                <li></li>
              )}
            </ul>
          )}
        </div>
        <div>
          <button className="btn btn-primary" onClick={HandlerButton()}>
            Buscar
          </button>
        </div>
      </div>
      {VuelosFiltrados.length != 0 ? (
        <div>
          {hasFlights == 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra text-center">
                <thead>
                  <tr>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {VuelosFiltrados.map((x) => {
                    return (
                      <tr>
                        <th>{x.origin}</th>
                        <td>{x.destination}</td>
                        <td>{x.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
