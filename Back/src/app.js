import express from "express";
import morgan from "morgan";
import cors from "cors";
import { ConnectDB } from "./db.js";
import routes from "./routes/flights.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api", routes);

ConnectDB();

app.listen(8000);
console.log("server is running in port", 8000);
