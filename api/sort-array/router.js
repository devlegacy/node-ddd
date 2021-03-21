const express = require('express');
const SortArrayController = require('./sort-array-controller');
const router = express.Router();

router.post('/', SortArrayController.get);

module.exports.sortArrayRouter = router;
