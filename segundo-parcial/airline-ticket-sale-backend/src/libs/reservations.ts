import Reservation, { ReservationSchema } from "@models/Reservation";
import Country, { CountrySchema } from "@models/Country";
import { logger } from "../..";

export const GetAllReservations = async () => {
  // get all documents
  let reservations = await Reservation.find();

  // return all documents
  return reservations;
};

export const thereIsSimilarOneReservation = async (
  originPlace: any,
  destinationPlace: any,
  date: Date
) => {
  // get one document with those characteristics 
  let reservation = await Reservation.findOne({
    origin_place: originPlace,
    destination_place: destinationPlace,
    date: date,
  });

  logger.info(reservation)

  if (reservation !== null) {
    return true
  }

  // return all documents
  return false;
};
