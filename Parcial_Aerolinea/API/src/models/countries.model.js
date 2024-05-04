import mongoose from "mongoose";

const countriesSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      require: true 
    },
    code: { 
      type: String, 
      require: true 
    },
  },
);

export default mongoose.model("countries", countriesSchema);
