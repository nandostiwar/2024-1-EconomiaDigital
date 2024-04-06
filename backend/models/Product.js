const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../data/products.json');

class Product {
  static getProducts() {
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  }

  static saveProducts(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
  }
}

module.exports = Product;
