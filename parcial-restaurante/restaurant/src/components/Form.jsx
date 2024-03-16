import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Card,
  CardBody,
  CardTitle,
  Alert,
  CardHeader,
} from "reactstrap";

function LoginForm() {
  const [name, setName] = useState("Ana Lopez");
  const [password, setPassword] = useState("ana5678");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Iniciar sesión con:", name, password);
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      const response = await fetch("http://localhost:4000/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(data.mensaje); // Mostrar mensaje de éxito
        console.log("Usuario:", data.usuario); // Manejar usuario logueado aquí
      } else {
        setMensaje("Nombre de usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al conectar con el servidor");
    }
    // e.preventDefault();
    // if (name === "user" && password === "user2023") {
    //   goTo("/orderScreen");
    // } else if (name === "admin" && password === "admin2023") {
    //   goTo("/adminHome");
    // }
  };

  const goTo = useNavigate();
  return (
    <Container>
      <Card
        style={{
          width: "18rem",
        }}
      >
        <img alt="Sample" src="https://picsum.photos/300/200" />
        <CardHeader>
          <h2>Iniciar Sesión</h2>
        </CardHeader>
        <CardBody>
          <Alert color="info" isOpen={visible} toggle={onDismiss}>
            I am an alert and I can be dismissed!
          </Alert>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Contraseña</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary" disabled={isLoading}>
              {isLoading && <Spinner size="sm">Loading...</Spinner>}
              <span> Iniciar Sesión</span>
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default LoginForm;
