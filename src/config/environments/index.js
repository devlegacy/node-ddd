require('dotenv').config();

const { NODE_ENV } = process.env;

if (!['development', 'production', 'qa'].includes(NODE_ENV)) {
  console.error(`'${NODE_ENV}' environment doesn't exits`);
  process.exit(1);
}

const environment = require(`./${NODE_ENV}.js`);
module.exports = environment;
