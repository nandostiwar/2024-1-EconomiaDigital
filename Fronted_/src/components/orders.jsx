import React from "react";
import useFetch from "../hooks/useFetch";
import TableOrders from "./tableOrders";

export default function Orders() {
  //Solicitud get a la ruta productos
  // El hook useFetch devuelve un objeto con dos propiedades: Data para los datos obtenidos de la solicitud 
  //y Error para cualquier error que ocurra durante la solicitud.
  const { Data, Error } = useFetch("/orders", "GET", { "": "" });


  return (
    <div className="flex justify-center">
      <div className="w-3/4">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex flex-row pb-4 justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Ordenes
            </h2>
          </div>

          {Data ? (
            <TableOrders props={Data} />
          ) : Error ? (
            <div className="flex justify-center space-y-2">
              <h1>{Error}</h1>
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
