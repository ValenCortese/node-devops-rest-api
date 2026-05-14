const request = require('supertest');
const app = require('../src/app');

describe('GET /error-test', () => {
  it('debe responder status 500', async () => {
    const res = await request(app).get('/error-test');
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });
});
