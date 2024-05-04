const Flight = require("../models/Flight");

module.exports = {

  
  getAllFlights: async (req, res, next) => {
    try {
      const flights = await Flight.find();
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFlightById: async (req, res, next) => {
    try {
      const { flightId } = req.params;
      const flight = await Flight.findById(flightId);
      if (!flight) {
        return res.status(404).json({ error: "Flight not found" });
      }
      res.status(200).json(flight);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addNewFlight: async (req, res, next) => {
    try {
      const { from, to, date } = req.body;
      const newFlight = new Flight({ from, to, date });
      await newFlight.save();
      res.status(201).json(newFlight);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteFlight: async (req, res, next) => {
    try {
      const { flightId } = req.params;
      const deletedFlight = await Flight.findByIdAndDelete(flightId);
      if (!deletedFlight) {
        return res.status(404).json({ error: "Flight not found" });
      }
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateFlight: async (req, res, next) => {
    try {
      const { flightId } = req.params;
      const updatedFlight = await Flight.findByIdAndUpdate(flightId, req.body, { new: true });
      res.status(200).json(updatedFlight);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  searchFlightsByFrom: async (req, res, next) => {
    try {
      const { from } = req.params;
      const flights = await Flight.find({ from: { $regex: new RegExp(from, "i") } });
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchFlightsByTo: async (req, res, next) => {
    try {
      const { to } = req.params;
      const flights = await Flight.find({ to: { $regex: new RegExp(to, "i") } });
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};