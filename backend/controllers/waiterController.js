const Order = require('../models/order.js');

class WaiterController {
  static getOrders(req, res) {
    const orders = Order.getOrders();
    res.json(orders);
  }

  static createOrder(req, res) {
    const { table, products, total } = req.body;
    const newOrder = { id: Date.now(), table, products, total, status: "Procesando" };
    const orders = Order.getOrders();
    orders.push(newOrder);
    Order.saveOrders(orders);
    res.status(201).json(newOrder);
  }
}

module.exports = WaiterController;
