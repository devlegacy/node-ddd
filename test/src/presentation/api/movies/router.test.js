const { Router } = require('express');
const MovieController = require('../../../../../src/presentation/api/movies/movie.controller');
const MovieRouter = require('../../../../../src/presentation/api/movies/router');
const {
  MovieServiceMock,
  moviesMock,
} = require('../../../../../src/presentation/api/movies/utils/mocks/movies');
const testServer = require('../../../../testServer');

describe('Movies endpoint', () => {
  const router = Router();
  const apiRoutes = Router();
  apiRoutes.use(
    '/movies/',
    MovieRouter({
      MovieController: new MovieController({
        MovieService: new MovieServiceMock(),
      }),
    })
    // Router().get('/', (req, res) => {
    //   res.status(200).send({ message: 'Hello world' });
    // })
  );
  router.use('/api/', apiRoutes);
  const request = testServer(router);

  describe('GET /api/movies/', () => {
    it('should response with status 200', async () => {
      const response = await request.get('/api/movies/');
      expect(response.statusCode).toEqual(200);
    });

    it('should response with a movies list', async () => {
      const response = await request.get('/api/movies/');
      expect(response.body).toEqual({
        data: moviesMock,
        message: 'List of movies',
      });
    });
  });
});
