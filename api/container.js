const { asClass, createContainer, asFunction, asValue } = require('awilix');
const { UserController } = require('./controllers');
const Routes = require('./routes');
const UserRoutes = require('./routes/user.routes');
const Server = require('./server');
const StartUp = require('./startup');
const config = require('../config/environments');
const container = createContainer();

container
  .register({
    app: asClass(StartUp).singleton(),
    server: asClass(Server).singleton(),
  })
  .register({
    UserController: asClass(UserController).singleton(),
  })
  .register({
    router: asFunction(Routes).singleton(),
  })
  .register({
    config: asValue(config),
  })
  .register({
    UserRoutes: asFunction(UserRoutes).singleton(),
  });

module.exports = container;
