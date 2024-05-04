import { Router } from "express";
import { GetCountries } from "../controllers/countries.controller.js";
import { CreateFlights, GetFlights } from "../controllers/flights.controller.js";

const router = Router();

router.get("/countries", GetCountries);
router.get("/flights", GetFlights);
router.post("/flights", CreateFlights);

export default router;
