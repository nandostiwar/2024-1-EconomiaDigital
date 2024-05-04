const router = require("express-promise-router")();
const FlightsController = require("../controllers/flights"); // Asegúrate de que el nombre del controlador sea correcto

router
  .route("/")
  .get(FlightsController.getAllFlights)
  .post(FlightsController.addNewFlight);

router
  .route("/:flightId") // Cambia de flightCode a flightId para que coincida con el parámetro esperado en el controlador
  .get(FlightsController.getFlightById)
  .delete(FlightsController.deleteFlight)
  .put(FlightsController.updateFlight);

router
  .route("/from/:fromCountry") // Cambia de from a fromCountry para mayor claridad
  .get(FlightsController.searchFlightsByFrom);

router
  .route("/to/:toCountry") // Cambia de to a toCountry para mayor claridad
  .get(FlightsController.searchFlightsByTo);

module.exports = router;