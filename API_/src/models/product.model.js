import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    producto: { type: String, require: true },
    precio: { type: String, require: true },
    status: { type: Boolean, require: true },
  },
  { timestamps: true, versionKey: false  }
);

export default mongoose.model("Product", productSchema);
