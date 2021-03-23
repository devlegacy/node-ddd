const { Router } = require('express');

module.exports = ({ HomeController }) => {
  const router = Router();
  router.get('/', HomeController.get);

  return router;
};
