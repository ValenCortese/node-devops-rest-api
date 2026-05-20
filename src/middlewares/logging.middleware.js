const pinoHttp = require('pino-http');
const logger = require('../lib/logger');

// Middleware de HTTP logging
const loggingMiddleware = pinoHttp({
  logger,
  // Configuramos qué propiedades queremos registrar en cada petición
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) {
      return 'error';
    }
    if (res.statusCode >= 400) {
      return 'warn';
    }
    return 'info';
  },
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      query: req.query,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});

module.exports = loggingMiddleware;
