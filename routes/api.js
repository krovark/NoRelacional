const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
  res.json({
    message: '✅ API funcionando correctamente',
    timestamp: new Date()
  });
});

module.exports = router;

