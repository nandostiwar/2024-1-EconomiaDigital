// routes/countries.js

const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries');

// Ruta para obtener todos los países disponibles
router.get('/', countriesController.getCountries);

// Ruta para crear un nuevo país
router.post('/', countriesController.createCountry);

module.exports = router;