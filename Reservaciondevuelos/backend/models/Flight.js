const mongoose = require("mongoose");
const Countries = require("./Countries");

const flightSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    validate: {
      validator: async function(value) {
        const country = await Countries.findOne({ name: value });
        return country !== null;
      },
      message: 'Invalid country'
    }
  },
  to: {
    type: String,
    required: true,
    validate: {
      validator: async function(value) {
        const country = await Countries.findOne({ name: value });
        return country !== null;
      },
      message: 'Invalid country'
    }
  },
  date: {
    type: String,
    required: true
  }
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;