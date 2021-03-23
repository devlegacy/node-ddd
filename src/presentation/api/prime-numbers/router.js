const { Router } = require('express');

module.exports = ({ PrimeNumberController }) => {
  const router = Router();

  router.get('/:start/:end', PrimeNumberController.get);

  return router;
};
