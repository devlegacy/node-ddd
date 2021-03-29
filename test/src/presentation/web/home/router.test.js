const { Router } = require('express');
const testServer = require('../../../../testServer');
const HomeController = require('../../../../../src/presentation/web/home/home.controller');
const HomeRouter = require('../../../../../src/presentation/web/home/router');
describe('Home endpoint', () => {
  const router = Router();
  const webRoutes = Router();
  webRoutes.use(
    '/',
    HomeRouter({
      HomeController: new HomeController(),
    })
  );
  router.use('/', webRoutes);
  const request = testServer(router);
  it('should show hello message from home endpoint', async () => {
    const response = await request.get('/');

    expect(response.statusCode).toEqual(200);
    expect(response.text).toContain('Hellooooo!!!');
  });
});
