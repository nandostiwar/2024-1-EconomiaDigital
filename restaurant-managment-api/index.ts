// import modules
import express from "express";
import * as Logger from "@config/loggers";
import userRouter from "@routes/users";
import * as dotenv from "dotenv"
import connectToDb from "@config/db";
import authRouter from "@routes/auth";
import cors from "cors"
import productRouter from "@routes/product";

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

// connect to mongoose db
connectToDb()

// assign router endpoints
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/auth', authRouter)

// start running web server
app.listen(PORT, () => {
  logger.info(`Web server running on port ${PORT}`)
})

