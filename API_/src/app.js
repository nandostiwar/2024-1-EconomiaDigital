import express from "express";
import morgan from "morgan";
import { ConnectDB } from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import productRoutes from "./routes/products.routes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", ordersRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);

ConnectDB();
app.listen(3000);
console.log("Server on port", 3000);
