const express = require('express');
const request = require('supertest');

function testServer(router) {
  const app = express();
  app.use(router);

  return request(app);
}

module.exports = testServer;
