// src/middlewares/metrics.middleware.js
'use strict';

const {
  httpRequestCounter,
  httpRequestDurationBucket,
  httpRequestDurationBuckets,
  httpRequestDurationCount,
  httpRequestDurationSum,
} = require('../lib/metrics');

function metricsMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const labels = {
      method:  req.method,
      route:   req.route?.path || req.path,
      status:  String(res.statusCode),
    };
    httpRequestCounter.add(1, labels);
    httpRequestDurationCount.add(1, labels);
    httpRequestDurationSum.add(duration, labels);

    httpRequestDurationBuckets.forEach((boundary) => {
      if (duration <= boundary) {
        httpRequestDurationBucket.add(1, {
          ...labels,
          le: boundary === Infinity ? '+Inf' : String(boundary),
        });
      }
    });
  });

  next();
}

module.exports = metricsMiddleware;