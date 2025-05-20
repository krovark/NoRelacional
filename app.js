//Express
var express = require('express');
var cookieParser = require('cookie-parser');
var bluebird = require('bluebird');
require('dotenv').config();

//incorporo cors
var cors = require('cors');

//importo router
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api'); //Custom

//instancio el servidor
var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//aplico cors
app.use(cors());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//Indico las rutas de los endpoint
app.use('/api', apiRouter);
app.use('/', indexRouter);

// Load additional configuration if in Development mode
if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}

//Database connection --
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_RETRY_WRITES,
  DB_WRITE_CONCERN,
  DB_APP_NAME
} = process.env;

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=${DB_RETRY_WRITES}&w=${DB_WRITE_CONCERN}&appName=${DB_APP_NAME}`;

console.log("MongoDB URL:", url);

const opts = {

  connectTimeoutMS: 20000,
};

mongoose.connect(url, opts)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((e) => {
    console.error('Error connecting to MongoDB:', e);
  });

// Setup server port
var port = process.env.PORT || 8080;
// Escuchar en el puerto
app.listen(port, () => {
  console.log('Servidor de ABM Users iniciado en el puerto ', port);
});

module.exports = app;