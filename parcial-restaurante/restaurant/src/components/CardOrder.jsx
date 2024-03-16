import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
} from "reactstrap";

function CardOrder({ orders }) {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Pedido #{orders.id}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Mesa: {orders.mesa}
          </CardSubtitle>
          <CardText>
            {orders.items.map((item, index) => (
              <div key={index}>
                <strong>{item.nombre}</strong> - Cantidad: {item.cantidad}
              </div>
            ))}
          </CardText>
          <Button color="primary">Detalles</Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardOrder;
