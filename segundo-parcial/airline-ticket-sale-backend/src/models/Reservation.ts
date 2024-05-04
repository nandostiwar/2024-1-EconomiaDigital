import mongoose from "mongoose";
import { CountrySchema } from "./Country";

// defining country schema
export const ReservationSchema = new mongoose.Schema({
  origin_place: { type: CountrySchema, required: true },
  destination_place: { type: CountrySchema, required: true },
  date: { type: Date, required: true },
});

// define mongo model
export const Reservation = mongoose.model(
  "Reservation",
  ReservationSchema,
  "reservations"
);

// export country
export default Reservation;
