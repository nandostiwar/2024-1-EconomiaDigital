import express from "express"
import ProductController from "@controllers/product";

// define router to group variables
const productRouter = express.Router();

// define routes
productRouter.get('/', ProductController.getAll)
productRouter.get('/name/:name', ProductController.getOneName)
productRouter.get('/:id', ProductController.getOne)
productRouter.post('/', ProductController.createOne)


export default productRouter
