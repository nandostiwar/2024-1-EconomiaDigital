import Flights from "../models/flights.model.js";

export const GetFlights = async (req, res) => {
  const flights = await Flights.find();
  if (!flights)
    return res
      .status(404)
      .json({ message: "no se encontraron vuelos disponibles" });
  res.json(flights);
};

export const CreateFlights = async (req, res) => {
    const {destination, origin, date} = req.body;
    const newFlight = new Flights({ destination, origin, date });
    const saveFlight = await newFlight.save();
    res.json(saveFlight);
};
