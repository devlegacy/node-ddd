/* eslint-disable no-undef */
const express = require('express');

class Server {
  constructor({ config, router }) {
    this._config = config;

    this._express = express();
    this._express.use(router);
  }

  async start() {
    // @ts-ignore
    const http = this._express.listen(this._config.PORT, () => {
      // @ts-ignore
      const { port } = http.address();
      console.log(`Application running on http://localhost:${port}`);
    });
  }

  app() {
    return this._express;
  }
}

module.exports = Server;
