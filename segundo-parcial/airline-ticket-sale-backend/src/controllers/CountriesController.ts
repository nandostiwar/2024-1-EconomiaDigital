import { type Response, type Request } from "express";
import { GetAllCountries } from "@libs/countries";
import Country from "@models/Country";

export class CountriesController {
  static async getAll(_: Request, res: Response) {
    // get all documents
    const countries = await GetAllCountries()

    // return list of documents
    return res.status(200).json(countries);
  }

  static async createOne(req: Request, res: Response) {
    // get request body with data
    let reqBody = req.body

    // create instance of product
    let country = new Country(reqBody)

    // check if body format is correct
    if (!(country.name)) {
      return res.status(401).json({
        document: country,
        is_stored: false
      })
    }

    // save product into DB
    country.save()

    // return response with success status and request body
    return res.status(201).json({
      document: country,
      is_stored: true
    })
  }
  
}

export default CountriesController;
