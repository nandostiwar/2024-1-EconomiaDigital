import mongoose from "mongoose";

// defining country schema
export const CountrySchema = new mongoose.Schema({
  name: { type: String },
  code: { type: String },
});

// define mongo model
export const Country = mongoose.model("Country", CountrySchema, "countries");

// export country
export default Country;
