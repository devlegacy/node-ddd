const express = require('express');
const router = express.Router();
const { bracketRouter } = require('../api/bracket/router');
const { primeNumbersRouter } = require('../api/prime-numbers/router');
const { sortArrayRouter } = require('../api/sort-array/router');
const { tournamentRouter } = require('../api/tournaments/router');
const { homeRouter } = require('../services/home/router');

router
  .use('/', homeRouter)
  .use('/numbersPrime', primeNumbersRouter)
  .use('/sortArray', sortArrayRouter)
  .use('/generateBracket', bracketRouter)
  .use('/tournaments', tournamentRouter);

module.exports = router;
