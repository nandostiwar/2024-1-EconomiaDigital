import { type Response, type Request } from "express";
import {
  GetAllReservations,
  thereIsSimilarOneReservation,
} from "@libs/reservations";
import Reservation from "@models/Reservation";
import { logger } from "../..";

export class ReservationsController {
  static async getAll(_: Request, res: Response) {
    // get all documents
    const documents = await GetAllReservations();

    // return list of documents
    return res.status(200).json(documents);
  }

  static async createOne(req: Request, res: Response) {
    try {
      // get request body with data
      let reqBody = req.body;

      // create instance of product
      let reservation = new Reservation(reqBody);

      // check if body format is correct
      if (!reservation.date) {
        return res.status(401).json({
          document: reservation,
          is_stored: false,
        });
      }

      // check if similar one
      let cloned = await thereIsSimilarOneReservation(
        reservation.origin_place,
        reservation.destination_place,
        reservation.date
      );

      // verify similar one
      if (cloned) {
        return res.status(409).json({
          document: reservation,
          is_stored: false,
        });
      }

      // save product into DB
      reservation.save();

      // return response with success status and request body
      return res.status(201).json({
        document: reservation,
        is_stored: true,
      });
    } catch (error) {
      logger.error(error);
      return res.status(400).json({
        document: null,
        is_stored: true,
      });
    }
  }
}

export default ReservationsController;
