import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    destination: { type: String, require: true },
    origin: { type: String, require: true },
    date: { type: String, require: true },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("flights", flightSchema);
