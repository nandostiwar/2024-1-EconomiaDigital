import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://TatianaAcosta_2205:*****@cluster0.j1v1ewn.mongodb.net/Economia_viajes?retryWrites=true&w=majority"
    );
    console.log("La base de datos esta funcionando")
  } catch (error) {
    console.log(error);
  }
};
