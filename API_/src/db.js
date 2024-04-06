import mongoose from "mongoose";

//Conexion base de datos
export const ConnectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://TatianaAcosta_2205:Tatiana2205@cluster0.j1v1ewn.mongodb.net/Parcial_economia?retryWrites=true&w=majority"
    );
    console.log("DB is connected")
  } catch (error) {
    console.log(error);
  }
};
