import Countries from "../models/countries.model.js"

//Obtiene los paises que estan en la base de datos
export const GetCountries = async (req, res) => {
    const CountriesName = await Countries.find();
    if (!CountriesName)
        return res.status(404).json({ message: "no se encontraron paises" });
    res.json(CountriesName);
};
