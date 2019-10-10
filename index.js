require('env2')('.env');
const app = require('./src/app');
const logger = require('./src/modules/logger');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => logger.info(`Server running on port ${PORT} `));

/**
 * Capture uncaught exceptions. The process is considered unstable and
 * is shut down.
 */
process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'UncaughtException');
  process.exit(1);
});

/**
 * Capture unhandled rejections. The process is considered unstable and
 * is shut down.
 */
process.on('unhandledRejection', (err) => {
  logger.fatal({ err }, 'UnhandledRejection');
  process.exit(1);
});
