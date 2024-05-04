
const Country = require('../models/Countries');

// Controlador para obtener todos los países disponibles
exports.getCountries = async (req, res) => {
    try {
        const countries = await Country.find();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para crear un nuevo país
exports.createCountry = async (req, res) => {
    try {
        const { name, code } = req.body;
        const existingCountry = await Country.findOne({ name });
        if (existingCountry) {
            return res.status(400).json({ error: 'El país ya existe' });
        }
        const newCountry = new Country({ name, code });
        await newCountry.save();
        res.status(201).json(newCountry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};