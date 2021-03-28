const { Router } = require('express');

module.exports = ({ MovieController }) => {
  const router = Router();

  router.get('/', MovieController.index);
  router.get('/:movieId', MovieController.show);
  router.post('/', MovieController.create);
  router.put('/:movieId', MovieController.update);
  router.delete('/:movieId', MovieController.delete);

  return router;
};
