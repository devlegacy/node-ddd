const { Router } = require('express');

module.exports = ({ TournamentController }) => {
  const router = Router();

  router.get('/', TournamentController.get);
  router.get(
    '/byNameOrDescription/:nameOrDescription',
    TournamentController.getByNameOrDescription
  );

  return router;
};
