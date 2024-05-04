//Se inicializa la app
import express from "express";
import morgan from "morgan";
import cors from "cors";
//Conexion con la base de datos
import { ConnectDB } from "./db.js";
import routes from "./routes/flights.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", routes);

ConnectDB();

app.listen(4000);
console.log("Servidor en el puerto", 4000);
