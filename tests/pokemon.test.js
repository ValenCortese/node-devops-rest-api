const request = require('supertest');
const app = require('../src/app');

describe('GET /pokemon/:name', () => {
  it('debe responder status 200 y devolver el nombre', async () => {
    const res = await request(app).get('/pokemon/pikachu');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('pikachu');
  });

  it('debe responder 404 si el pokemon no existe', async () => {
    const res = await request(app).get('/pokemon/pokemon-inexistente');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Pokemon not found');
  });
});
