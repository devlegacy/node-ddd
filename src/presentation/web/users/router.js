const { Router } = require('express');

module.exports = ({ UserController }) => {
  const router = Router();

  router.get('/', UserController.index);
  router.get('/:id', UserController.show);
  router.post('/', UserController.create);
  router.put('/:id', UserController.update);
  router.delete('/:id', UserController.delete);

  return router;
};
