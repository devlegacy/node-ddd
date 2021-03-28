const { Router } = require('express');
const requestValidationHandler = require('../../middlewares/requestValidationHandler');
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('./utils/schemas/movies');

module.exports = ({ MovieController }) => {
  const router = Router();

  router.get('/', MovieController.index);
  router.get(
    '/:movieId',
    requestValidationHandler({ movieId: movieIdSchema }, 'params'),
    MovieController.show
  );
  router.post(
    '/',
    requestValidationHandler(createMovieSchema, 'body'),
    MovieController.create
  );
  router.put(
    '/:movieId',
    requestValidationHandler({ movieId: movieIdSchema }, 'params'),
    requestValidationHandler(updateMovieSchema, 'body'),
    MovieController.update
  );
  router.delete(
    '/:movieId',
    requestValidationHandler({ movieId: movieIdSchema }, 'params'),
    MovieController.delete
  );

  return router;
};
