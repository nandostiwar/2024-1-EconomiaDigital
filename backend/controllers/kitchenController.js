const Order = require('../models/order.js');

class KitchenController {
  static getOrders(req, res) {
    const orders = Order.getOrders();
    res.json(orders);
  }

  static updateOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const orders = Order.getOrders();
    const orderIndex = orders.findIndex(order => order.id === parseInt(id));
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      Order.saveOrders(orders);
      res.json(orders[orderIndex]);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  }
}

module.exports = KitchenController;
