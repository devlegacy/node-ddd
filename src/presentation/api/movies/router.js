const { Router } = require('express');
const requestValidationHandler = require('../../middlewares/requestValidationHandler');
const {
  getMovieIDSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('./utils/schemas/movies');

module.exports = ({ MovieController }) => {
  const router = Router();

  router.get('/', MovieController.index);
  router.get(
    '/:movieId',
    requestValidationHandler(getMovieIDSchema, 'params'),
    MovieController.show
  );
  router.post(
    '/',
    requestValidationHandler(createMovieSchema, 'body'),
    MovieController.create
  );
  router.put(
    '/:movieId',
    requestValidationHandler(getMovieIDSchema, 'params'),
    requestValidationHandler(updateMovieSchema, 'body'),
    MovieController.update
  );
  router.delete(
    '/:movieId',
    requestValidationHandler(getMovieIDSchema, 'params'),
    MovieController.delete
  );

  return router;
};
