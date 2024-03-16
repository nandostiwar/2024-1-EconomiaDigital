const fs = require('fs/promises');
const path = require('path');

const getAllOrders = async (req, res) => {
    const order = await fs.readFile(path.join(__dirname, '../../db/orders.json'));
    const ordersJson = JSON.parse(order)
    res.json(ordersJson);
}

module.exports = {
    getAllOrders,
}