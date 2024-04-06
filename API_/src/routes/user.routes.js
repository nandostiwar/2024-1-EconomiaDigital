import { Router } from "express";
import {
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/users", authRequired, getUsers);

router.get("/users/:id", authRequired, getUser);

router.put("/users/:id", authRequired, updateUser);

export default router;
