import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Alexander:1234@cluster.wc0ampm.mongodb.net/EconomiaDigitalSegundoCorte?retryWrites=true&w=majority"
    );
    console.log(">>> DB is conected <<<")
  } catch (error) {
    console.log(error);
  }
};