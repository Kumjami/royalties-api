const bunyan = require('bunyan');

const { LOG_LEVEL } = process.env;

const logger = bunyan.createLogger({
  name: 'Royalties',
  level: LOG_LEVEL || bunyan.INFO,
});

module.exports = logger;
