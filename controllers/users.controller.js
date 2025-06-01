// controllers/userController.js
const userService = require('../services/user.service');

exports.register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { token, user } = await userService.login(req.body);
    res.json({ token, user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateProfile(req.userId, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
