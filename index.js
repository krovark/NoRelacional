const express = require('express');
const path = require('path');
const app = express();

// Middlewares
app.use(express.json());

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
const routes = require('./routes');
app.use('/', routes); 

// front
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
