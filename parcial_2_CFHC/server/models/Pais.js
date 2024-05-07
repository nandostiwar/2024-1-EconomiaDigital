const mongoose = require('mongoose');

const paisSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
});

const PaisModel = mongoose.model('Paises', paisSchema);

module.exports = PaisModel;