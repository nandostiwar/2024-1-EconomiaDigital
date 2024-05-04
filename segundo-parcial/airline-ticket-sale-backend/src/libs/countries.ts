import Country from "@models/Country";

export const GetAllCountries = async () => {
  // get all documents
  let countries = await Country.find();

  // return all documents
  return countries;
};
