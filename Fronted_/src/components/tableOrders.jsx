import React, { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import useFetch from "../hooks/useFetch";

export default function TableOrders(props) {
  const handlerDeleteButton = (e) => {
    console.log(e);
  };

  return (
    <div className="overflow-x-auto h-96">
      <table className="table table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>Mesa</th>
            <th>Nota</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Usuario</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {/* El map itera sobre el array props.props para cada elemento x */}

          {props.props.map((x) => {
            return (
              <tr>
                <td>{x.mesa}</td>
                <td>{x.nota}</td>
                <td>
                  <ul className="space-y-2">
                    {x.productsOrder.map((prod) => {
                      return (
                        <li>
                          <h1>{prod.producto}</h1>
                          <p>{prod.precio}</p>
                        </li>
                      );
                    })}
                  </ul>
                </td>
                <td>{x.total}</td>
                <td>{x.userOrder.name}</td>
                <th className="flex flex-row space-x-2">
                  <button className="btn btn-ghost btn-md">
                    <FaRegEdit />
                  </button>
                  <button
                    className="btn btn-ghost btn-md"
                    onClick={handlerDeleteButton}
                  >
                    <FaTrashAlt />
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
