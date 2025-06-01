// middleware/authorization.js
const jwt = require('jsonwebtoken');
const { getRedisClient } = require('../database/redis'); // ← Desestructuramos

const authorization = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    // ← nuevamente: obtenemos el client real
    const redisClient = getRedisClient();
    const redisToken = await redisClient.get(`session:${decoded.id}`);
    if (!redisToken || redisToken !== token) {
      return res.status(401).json({ auth: false, message: 'Invalid session.' });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
  }
};

module.exports = authorization;
