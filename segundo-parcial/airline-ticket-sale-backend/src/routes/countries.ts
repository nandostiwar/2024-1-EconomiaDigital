import express from "express";
import CountriesController from "@controllers/CountriesController";

// define router to group variables
const countriesRouter = express.Router();

// define routes
countriesRouter.get("/", CountriesController.getAll);
// countriesRouter.get('/name/:name', UserController.getOneName)
// countriesRouter.get('/:id', UserController.getOne)
// countriesRouter.post('/', UserController.createOne)

export default countriesRouter;
