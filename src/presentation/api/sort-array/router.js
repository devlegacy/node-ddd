const { Router } = require('express');

module.exports = ({ SortArrayController }) => {
  const router = Router();

  router.post('/', SortArrayController.post);

  return router;
};
