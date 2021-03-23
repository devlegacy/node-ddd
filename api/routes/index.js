const { Router } = require('express');
const cors = require('cors');
const express = require('express');
const compression = require('compression');

module.exports = ({ UserRoutes }) => {
  const router = Router();
  const apiRoutes = Router();

  apiRoutes
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(compression());
  apiRoutes.use('/user', UserRoutes);

  router.use('/api/', apiRoutes);

  return router;
};
