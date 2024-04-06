const fs = require('fs');
const path = require('path');

const ordersFilePath = path.resolve(__dirname, '../data/orders.json');

class Order {
  static getOrders() {
    return JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
  }

  static saveOrders(orders) {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf-8');
  }
}

module.exports = Order;
