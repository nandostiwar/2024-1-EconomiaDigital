const fs = require('fs');
const path = require('path');

const usersFilePath = path.resolve(__dirname, '../data/users.json');

class User {
  static getUsers() {
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  }

  static saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
  }

  static getUserByUsername(username) {
    return this.getUsers().find(user => user.username === username);
  }
}

module.exports = User;
