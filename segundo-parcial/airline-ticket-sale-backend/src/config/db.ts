import mongoose from "mongoose"
import { logger } from "../.."


const connectToDb = async () => {
  // get uri from dotenv
  let uri = process.env.MONGO_DSN

  // check for uri existance
  if (!uri) {
    logger.error('Error - DB uri is missing from .env file')
    return
  }

  // connect to db
  await mongoose.connect(uri,).finally(() => {
    logger.info("Conection to DB was succesfull")
  })
}

export default connectToDb
