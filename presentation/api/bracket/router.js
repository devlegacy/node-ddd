const { Router } = require('express');

module.exports = ({ BracketController }) => {
  const router = Router();

  router.get('/', BracketController.get);

  return router;
};
