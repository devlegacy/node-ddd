const { config } = require('./config/environment');

const cors = require('cors');
const express = require('express');
const router = require('./router');
const { logError, generalErrorHandler, error404 } = require('./middleware');
const app = express();

app
  .set('port', config.port)
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(router)
  .use(error404)
  .use(logError)
  .use(generalErrorHandler);

module.exports = { app };
