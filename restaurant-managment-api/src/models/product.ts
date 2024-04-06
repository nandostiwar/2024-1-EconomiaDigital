import { Schema, model } from "mongoose";

export const productSchema = new Schema({
  name: { type: String, unique: true },
  active: Boolean,
  price: Number,
});

const Product = model('Product', productSchema)

export default Product


