// controllers/userController.js
const userService = require('../services/user.service');
const { getRedisClient } = require('../database/redis');

exports.register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ message: 'Usuario creado', user });
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

exports.logout = async (req, res) => {
  try {
    const redisClient = getRedisClient();
    await redisClient.del(`session:${req.userId}`);
    res.json({ message: 'Se cerró la sesión' });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo cerrar sesión' });
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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
  
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'No se pudieron obtener los usuarios' });
  }
};