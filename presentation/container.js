const { asClass, createContainer, asFunction, asValue } = require('awilix');
const Routes = require('./routes');
const Server = require('./server');
const StartUp = require('./startup');
const config = require('../config/environments');
const UserRouter = require('./web/users/router');
const UserController = require('./web/users/user.controller');
const container = createContainer();
const BracketRouter = require('./api/bracket/router');
const BracketController = require('./api/bracket/bracket.controller');
const PrimeNumbersRouter = require('./api/prime-numbers/router');
const PrimeNumberController = require('./api/prime-numbers/prime-number.controller');
const SortArrayRouter = require('./api/sort-array/router');
const SortArrayController = require('./api/sort-array/sort-array.controller');
const TournamentRouter = require('./api/tournaments/router');
const TournamentController = require('./api/tournaments/tournament.controller');
const HomeRouter = require('./web/home/router');
const HomeController = require('./web/home/home.controller');
const UserService = require('../services/user.service');

container
  .register({
    app: asClass(StartUp).singleton(),
    server: asClass(Server).singleton(),
  })
  .register({
    HomeController: asClass(HomeController).singleton(),
    UserController: asClass(UserController).singleton(),
    BracketController: asClass(BracketController).singleton(),
    PrimeNumberController: asClass(PrimeNumberController).singleton(),
    SortArrayController: asClass(SortArrayController).singleton(),
    TournamentController: asClass(TournamentController).singleton(),
  })
  .register({
    router: asFunction(Routes).singleton(),
  })
  .register({
    config: asValue(config),
  })
  .register({
    UserRouter: asFunction(UserRouter).singleton(),
    BracketRouter: asFunction(BracketRouter).singleton(),
    PrimeNumbersRouter: asFunction(PrimeNumbersRouter).singleton(),
    SortArrayRouter: asFunction(SortArrayRouter).singleton(),
    TournamentRouter: asFunction(TournamentRouter).singleton(),
    HomeRouter: asFunction(HomeRouter).singleton(),
  })
  .register({
    UserService: asClass(UserService).singleton(),
  });

module.exports = container;