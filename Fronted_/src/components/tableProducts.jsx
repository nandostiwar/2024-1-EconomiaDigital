import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

export default function TableProducts(props) {
  const handlerDeleteButton = (e) => {
    console.log(e);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          
        {/* El map itera sobre el array props.props para cada elemento x */}

          {props.props.map((x) => {
            return (
              <tr>
                <td>{x.producto}</td>
                <td>{x.precio}</td>
                {x.status == true ? (
                  <td className="text-success">Activo</td>
                ) : (
                  <td className="text-error">Inactivo</td>
                )}
                <th className="space-x-2">
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
