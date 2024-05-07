const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({
  p_origen: {
    type: String,
    required: true,
  },
  p_destino: {
    type: String,
    required: true,
  },
  fechaV: {
    type: Date,
    required: true,
  },
});

const ReservaModel = mongoose.model("Reservas", ReservaSchema);
module.exports = ReservaModel;