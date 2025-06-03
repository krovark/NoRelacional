// Express
const express = require('express');
const cookieParser = require('cookie-parser');
const bluebird = require('bluebird');
require('dotenv').config();

// Conexiones a bases de datos
const connectMongo = require('./database/mongo');
const { connectRedis } = require('./database/redis');
const { connectNeo4j } = require('./database/neo');

// Middlewares
const cors = require('cors');

// Routers
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

// Instancia de Express
const app = express();

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:4000',    // si antes tenías frontend aquí
      'http://127.0.0.1:5500',    // donde abrís tu index.html ahora
      'http://localhost:5500',    // por si Live Server usa localhost:5500
      'http://localhost:8080'     // para casos en que pruebes desde el mismo puerto
    ],
    credentials: true,
  })
);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });

// Rutas
app.use('/api', apiRouter);
app.use('/', indexRouter);

// Cargar configuración adicional en modo desarrollo
if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}

// Conexiones a bases de datos
connectMongo();
connectRedis();
connectNeo4j();

// Puerto
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Servidor iniciado en el puerto ${port}`);
});

// Documentación Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
module.exports = app;

