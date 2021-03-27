const { Router } = require('express');

module.exports = ({ UserController }) => {
  const router = Router();

  router.get('/', UserController.getUsers);
  router.post('/', UserController.createUser);

  return router;
};
