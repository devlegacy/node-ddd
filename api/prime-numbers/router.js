const express = require('express');
const PrimeNumbersController = require('./prime-numbers-controller');
const router = express.Router();

router.get('/:start/:end', PrimeNumbersController.get);

module.exports.primeNumbersRouter = router;
