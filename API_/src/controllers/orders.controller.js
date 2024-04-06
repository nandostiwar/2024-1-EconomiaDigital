import mongoose from "mongoose";
import Order from "../models/order.model.js";

export const getOrders = async (req, res) => {
  //método aggregate realiza una operación de agregación en la colección Order.
  const orders = await Order.aggregate([
    {
      //$lookup se utiliza para realizar una unión externa izquierda con la colección users. 
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userOrder",
      },
    },
    //$unwind se utiliza para descomponer el array userOrder creado por la etapa $lookup
    { $unwind: "$userOrder" },
    {
      $lookup: {
        from: "products",
        localField: "productosid",
        foreignField: "_id",
        as: "productsOrder",
      },
    },
  ]);
  res.json(orders);
};

export const getOrder = async (req, res) => {
  const order = await Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userOrder",
      },
    },
    { $unwind: "$userOrder" },
    {
      $lookup: {
        from: "products",
        localField: "productosid",
        foreignField: "_id",
        as: "productsOrder",
      },
    },
    { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
  ]);
  if (!order) return res.status(404).json({ message: "Orden no encontrada" });
  res.json(order);
};

export const createOrder = async (req, res) => {
  const { user, mesa, productosid, nota, total } = req.body;
  const NewOrder = new Order({
    user: new mongoose.Types.ObjectId(user),
    mesa: mesa,
    productosid: productosid,
    nota: nota,
    total: total,
  });
  console.log(NewOrder);
  const saveOrder = await NewOrder.save();
  res.json(saveOrder);
};

export const deleteOrder = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ message: "Orden no encontrada" });
  res.json(order);
};

export const updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!order) return res.status(404).json({ message: "Orden no encontrada" });
  res.json(order);
};
