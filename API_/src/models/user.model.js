import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, trim: true, unique: true },
    password: { type: String, require: true },
    status: { type: Boolean, require: false, default: true },
    role: { type: String, require: true },
  },
  { timestamps: true, versionKey: false  }
);

export default mongoose.model("User", userSchema);
