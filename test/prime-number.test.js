const request = require('supertest');
const { app } = require('../');

describe('Prime number endpoint', () => {
  it('should return the result for 2 to 10 prime numbers', async () => {
    const response = await request(app).get('/numbersPrime/2/10');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('message');

    expect(response.body.data).toEqual([2, 3, 5, 7]);
    expect(response.body.message).toEqual('List of prime numbers from 2 to 10');
  });
});
