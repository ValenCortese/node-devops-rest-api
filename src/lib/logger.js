const pino = require('pino');

const transport = pino.transport({
  targets: [
    {
      target: 'pino-loki',
      options: {
        host: process.env.LOKI_HOST || 'http://loki:3100',
        labels: {
          app: 'pokemon-api',
        },
      },
    },
    {
      target: 'pino-pretty',
    },
  ],
});

const logger = pino(transport);

module.exports = logger;