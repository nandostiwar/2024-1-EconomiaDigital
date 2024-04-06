import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getOrder,
  getOrders,
  createOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/orders.controller.js";

const router = Router();

router.get("/orders", authRequired, getOrders);

router.get("/orders/:id", authRequired, getOrder);

router.post("/orders", authRequired, createOrder);

router.delete("/orders/:id", authRequired, deleteOrder);

router.put("/orders/:id", authRequired, updateOrder);

export default router;
