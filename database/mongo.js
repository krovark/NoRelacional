// database/mongo.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
  try {
    // Leemos la URI completa de .env, o caemos en el fallback local
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/redsocial';

    await mongoose.connect(uri, {
      connectTimeoutMS: 20000,
      useNewUrlParser:    true,
      useUnifiedTopology: true
    });

    console.log('✅ MongoDB conectado con éxito');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
  }
};

module.exports = connectMongo;
