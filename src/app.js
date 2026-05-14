const express = require('express');
const pokemonRoutes = require('./routes/pokemon.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

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
