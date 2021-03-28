const { Router } = require('express');
const cors = require('cors');
const express = require('express');
const compression = require('compression');
const {
  logError,
  generalErrorHandler,
  wrapError,
  error404,
} = require('../middlewares');

module.exports = ({
  HomeRouter,
  UserRouter,
  BracketRouter,
  PrimeNumbersRouter,
  SortArrayRouter,
  TournamentRouter,
  MovieRouter,
}) => {
  const router = Router();
  const apiRoutes = Router();
  const webRoutes = Router();

  apiRoutes
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(compression());
  apiRoutes
    .use('/numbersPrime', PrimeNumbersRouter)
    .use('/sortArray', SortArrayRouter)
    .use('/generateBracket', BracketRouter)
    .use('/tournaments', TournamentRouter)
    .use('/movies', MovieRouter);

  // middleware always at end of routes
  apiRoutes.use(error404).use(logError).use(wrapError).use(generalErrorHandler);

  webRoutes
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(compression());
  webRoutes.use('/', HomeRouter).use('/users', UserRouter);

  router.use('/api/', apiRoutes);
  router.use('/', webRoutes);

  return router;
};
