const mongoose = require("mongoose");

const CountriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    unique: true
  }
});

const Countries = mongoose.model("Countries", CountriesSchema);

module.exports = Countries;