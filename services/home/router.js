const express = require('express');
const HomeController = require('./home-controller');
const router = express.Router();

router.get('/', HomeController.get);

module.exports.homeRouter = router;
