const express = require('express');
const pokemonRoutes = require('./routes/pokemon.routes');
const errorMiddleware = require('./middlewares/error.middleware');
const loggingMiddleware = require('./middlewares/logging.middleware');
const metricsMiddleware = require('./middlewares/metrics.middleware');
const pinoHttp = require('pino-http');
const logger = require('./lib/logger');

const app = express();

app.use(express.json());
app.use(loggingMiddleware); 
app.use(pinoHttp({ logger }));
app.use(metricsMiddleware);

// Healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Pokemon routes
app.use('/pokemon', pokemonRoutes);

// Error test route
app.get('/error-test', (req, res, next) => {
  next(new Error('Intentional test error'));
});

// Global error handler
app.use(errorMiddleware);

module.exports = app;
