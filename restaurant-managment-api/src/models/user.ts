import { Schema, model } from "mongoose";

export const userSchema = new Schema({
  name: { type: String, unique: true },
  active: Boolean,
  role: String,
  password: String,
});

const User = model('User', userSchema)

export default User


