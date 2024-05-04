// import modules
import express from "express";
import * as Logger from "@config/logger";
import * as dotenv from "dotenv";
import cors from "cors";
import connectToDb from "@config/db";
import countriesRouter from "@routes/countries";
import reservationsRouter from "@routes/reservations";
import winston from "winston";

// setup dotenv config
dotenv.config()

// instance express app
export const app = express()

// Allow requests from all origins
app.use(cors());

// use json in request body
app.use(express.json())

// define port
const PORT = process.env.PORT

// get logger instance to avoid console log
export const logger = Logger.getLogger()

// In development, log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

// connect to mongoose db
connectToDb()

// assign router endpoints
app.use('/countries', countriesRouter)
app.use('/reservations', reservationsRouter)

// start running web server
app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`)
})

