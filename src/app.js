const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const logger = require('./modules/logger');
const royaltyManagerRoutes = require('./routes/royaltyManagerRoutes');

function handleCorrelationId(req, res, next) {
  const correlationId = req.get('correlation-id') || uuid();
  req.log = logger.child({ correlationId });
  res.set('correlation-id', correlationId);
  next();
}

const app = express();
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(handleCorrelationId);

app.use('/royaltymanager', royaltyManagerRoutes);
app.use((err, req, res, next) => {
  req.log.error({ err }, 'Error');
  const statusCode = err.isJoi ? 400 : 500;
  res.status(statusCode).send({ error: err.message });
  next();
});

module.exports = app;
