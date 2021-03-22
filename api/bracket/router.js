const express = require('express');
const BracketController = require('./bracket-controller');
const router = express.Router();

router.get('/', BracketController.get);

module.exports.bracketRouter = router;
