const User = require('../models/User');

class AdminController {
  static getUsers(req, res) {
    const users = User.getUsers();
    res.json(users);
  }

  static createUser(req, res) {
    const { username, password, role } = req.body;
    const newUser = { id: Date.now(), username, password, role };
    const users = User.getUsers();
    users.push(newUser);
    User.saveUsers(users);
    res.status(201).json(newUser);
  }

  static editUser(req, res) {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const users = User.getUsers();
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex !== -1) {
      users[userIndex] = { id: parseInt(id), username, password, role };
      User.saveUsers(users);
      res.json(users[userIndex]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }

  static deleteUser(req, res) {
    const { id } = req.params;
    const users = User.getUsers();
    const filteredUsers = users.filter(user => user.id !== parseInt(id));
    if (filteredUsers.length < users.length) {
      User.saveUsers(filteredUsers);
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
}

module.exports = AdminController;
