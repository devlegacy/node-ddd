const request = require('supertest');
const { app } = require('../');

describe('Home endpoint', () => {
  it('should show hello message from home endpoint', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toEqual(200);
    expect(response.text).toContain('Hellooooo!!!');
  });
});
