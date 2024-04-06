import { Schema, model } from "mongoose";

export const orderProductSchema = new Schema({
  name: String,
  quantity: Number,
  note: String,
  price: Number,
});

const OrderProduct = model('OrderProduct', orderProductSchema)

export default OrderProduct


