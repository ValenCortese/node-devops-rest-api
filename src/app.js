const express = require('express');
const pokemonRoutes = require('./routes/pokemon.routes');
const errorMiddleware = require('./middlewares/error.middleware');
const loggingMiddleware = require('./middlewares/logging.middleware');
const pinoHttp = require('pino-http');
const logger = require('./lib/logger');
const metricsClient = require('./metrics');

const app = express();

app.use(express.json());
app.use(loggingMiddleware); 
app.use(pinoHttp({ logger }));
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

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', metricsClient.register.contentType);
  res.end(await metricsClient.register.metrics());
});

// Global error handler
app.use(errorMiddleware);

module.exports = app;
