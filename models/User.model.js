// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: {
    type: String,
    default: 'https://res.cloudinary.com/dstqx4yk0/image/upload/v1747277212/default_profile.png',
  },
  bio: { type: String, maxlength: 200, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);

