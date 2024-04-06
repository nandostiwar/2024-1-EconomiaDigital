import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, require: true },
    mesa: { type: String, require: true },
    productosid: { type: [{ type: mongoose.Types.ObjectId, ref: "productosid" }]},
    nota: { type: String },
    total: { type: String, require: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Order", orderSchema);
