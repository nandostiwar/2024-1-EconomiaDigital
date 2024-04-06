import express from "express"
import UserController from "@controllers/users";

// define router to group variables
const authRouter = express.Router();

// define routes
authRouter.post('/login', UserController.authUser)

export default authRouter
