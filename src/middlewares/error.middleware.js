const logger = require('../lib/logger');

// Middleware global de manejo de errores
module.exports = (err, req, res, next) => {
  logger.error({ err }, err.message || 'Error interno del servidor capturado en middleware');
  res.status(500).json({ error: 'Internal Server Error' });
};
