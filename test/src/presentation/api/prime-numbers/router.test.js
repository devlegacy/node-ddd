const { Router } = require('express');
const PrimeNumberController = require('../../../../../src/presentation/api/prime-numbers/prime-number.controller');
const PrimeNumberRouter = require('../../../../../src/presentation/api/prime-numbers/router');

const testServer = require('../../../../testServer');

describe('Prime number endpoint', () => {
  const router = Router();
  const apiRoutes = Router();
  apiRoutes.use(
    '/numbersPrime/',
    PrimeNumberRouter({
      PrimeNumberController: new PrimeNumberController(),
    })
  );
  router.use('/api/', apiRoutes);
  const request = testServer(router);
  it('should return the result for 2 to 10 prime numbers', async () => {
    const response = await request.get('/api/numbersPrime/2/10');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('message');

    expect(response.body.data).toEqual([2, 3, 5, 7]);
    expect(response.body.message).toEqual(
      'List of prime numbers from 2 to 10. Count: 4.'
    );
  });
});
