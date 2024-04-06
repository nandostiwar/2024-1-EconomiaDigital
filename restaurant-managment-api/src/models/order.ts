import { Schema, model } from "mongoose";
import OrderProduct from "./order_product";

export const orderSchema = new Schema({
  name: String,
  table: Number,
  waiter: String,
  products: Array<typeof OrderProduct>,
  active: Boolean,
  price: Number,
});

const Order = model('Order', orderSchema)

export default Order
