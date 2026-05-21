// src/lib/metrics.js
'use strict';

const { metrics } = require('@opentelemetry/api');

const meter = metrics.getMeter('pokemon-api');

const httpRequestCounter = meter.createCounter('http_requests_total', {
  description: 'Total de requests HTTP',
});

const httpRequestDurationBucket = meter.createCounter('http_request_duration_ms_bucket', {
  description: 'Buckets de duracion de requests HTTP en ms',
});

const httpRequestDurationSum = meter.createCounter('http_request_duration_ms_sum', {
  description: 'Suma de duracion de requests HTTP en ms',
  unit: 'ms',
});

const httpRequestDurationCount = meter.createCounter('http_request_duration_ms_count', {
  description: 'Cantidad de requests HTTP medidos',
});

const pokemonFetchCounter = meter.createCounter('pokemon_fetches_total', {
  description: 'Total de consultas a PokéAPI',
});

const pokemonFetchErrors = meter.createCounter('pokemon_fetch_errors_total', {
  description: 'Errores al consultar PokéAPI',
});

module.exports = {
  httpRequestCounter,
  httpRequestDurationBucket,
  httpRequestDurationSum,
  httpRequestDurationCount,
  pokemonFetchCounter,
  pokemonFetchErrors,
  httpRequestDurationBuckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, Infinity],
};