// database/redis.js
const { createClient } = require('redis');
require('dotenv').config();

let client;  // lo inicializamos aquí para poder usarlo en otros lugares

async function connectRedis() {
  client = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
    password: process.env.REDIS_PASSWORD || undefined,
  });

  client.on('error', err => console.error('❌ Redis Error', err));
  await client.connect();
  console.log('✅ Conectado a Redis');
}

// (opcional) función para obtener el cliente ya conectado
function getRedisClient() {
  if (!client) throw new Error('Redis no está conectado todavía');
  return client;
}

module.exports = { connectRedis, getRedisClient };
