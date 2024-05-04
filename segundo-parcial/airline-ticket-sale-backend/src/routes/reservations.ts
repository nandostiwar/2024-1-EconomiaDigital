
import express from "express";
import CountriesController from "@controllers/CountriesController";
import ReservationsController from "@controllers/ReservationsControllers";

// define router to group variables
const reservationsRouter = express.Router();

// define routes
reservationsRouter.get("/", ReservationsController.getAll);
// countriesRouter.get('/name/:name', UserController.getOneName)
// countriesRouter.get('/:id', UserController.getOne)
reservationsRouter.post('/', ReservationsController.createOne)

export default reservationsRouter;
