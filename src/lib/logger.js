// src/lib/logger.js
'use strict';

const pino = require('pino');

const isProduction = process.env.NODE_ENV === 'production';
const OTLP_ENDPOINT = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
const OTLP_HEADERS = process.env.OTEL_EXPORTER_OTLP_HEADERS || '';

function parseHeaders(raw) {
  return Object.fromEntries(
    raw.split(',').filter(Boolean).map((header) => header.split('=').map((s) => s.trim()))
  );
}

const headers = OTLP_HEADERS ? parseHeaders(OTLP_HEADERS) : {};

// En producción: JSON puro (Loki lo recibe vía pino-opentelemetry-transport)
// En desarrollo: pretty print
const transport = isProduction
  ? {
      target: 'pino-opentelemetry-transport',
      options: {
        url: OTLP_ENDPOINT ? `${OTLP_ENDPOINT}/v1/logs` : undefined,
        headers,
        resourceAttributes: {
          'service.name':    process.env.OTEL_SERVICE_NAME || 'pokemon-api',
          'service.version': process.env.npm_package_version || '1.0.0',
        },
      },
    }
  : {
      target: 'pino-pretty',
      options: { colorize: true },
    };

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    base: {
      service: process.env.OTEL_SERVICE_NAME || 'pokemon-api',
      env:     process.env.NODE_ENV || 'development',
    },
  },
  pino.transport(transport),
);

module.exports = logger;