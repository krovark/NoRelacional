const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
  try {
    const {
      DB_USER,
      DB_PASSWORD,
      DB_HOST,
      DB_NAME,
      DB_RETRY_WRITES,
      DB_WRITE_CONCERN,
      DB_APP_NAME
    } = process.env;

    const url = `mongodb+srv://redsocial:1234@clusterredsocial.hyfo2lt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterRedSocial`;

    await mongoose.connect(url, {
      connectTimeoutMS: 20000,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ MongoDB conectado con éxito');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
  }
};

module.exports = connectMongo;

