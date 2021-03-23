const { Router } = require('express');
const cors = require('cors');
const express = require('express');
const compression = require('compression');

module.exports = ({
  HomeRouter,
  UserRouter,
  BracketRouter,
  PrimeNumbersRouter,
  SortArrayRouter,
  TournamentRouter,
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
    .use('/tournaments', TournamentRouter);

  webRoutes.use('/', HomeRouter);
  webRoutes.use('/users', UserRouter);

  router.use('/api/', apiRoutes);
  router.use('/', webRoutes);

  return router;
};
