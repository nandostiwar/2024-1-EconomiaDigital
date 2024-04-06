import express from "express"
import UserController from "@controllers/users";

// define router to group variables
const userRouter = express.Router();

// define routes
userRouter.get('/', UserController.getAll)
userRouter.get('/name/:name', UserController.getOneName)
userRouter.get('/:id', UserController.getOne)
userRouter.post('/', UserController.createOne)


export default userRouter
