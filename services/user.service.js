const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getRedisClient } = require('../database/redis'); 

exports.register = async ({ username, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('Email ya en uso');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  return await user.save();
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credentials invalidas');
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '2h' });


  const redisClient = getRedisClient();
  await redisClient.set(`session:${user._id}`, token, {
    EX: 60 * 60 * 2, //  2 horas
  });

  return { token, user };
};

exports.updateProfile = async (userId, updates) => {
  return await User.findByIdAndUpdate(userId, updates, { new: true });
};

exports.getAllUsers = async () => {
 
  return await User.find({}, { username: 1 });
};