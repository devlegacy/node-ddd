const express = require('express');
const TournamentController = require('./tournament-controller');
const router = express.Router();

router.get('/', TournamentController.get);
router.get(
  '/byNameOrDescription/:nameOrDescription',
  TournamentController.getByNameOrDescription
);

module.exports.tournamentRouter = router;
