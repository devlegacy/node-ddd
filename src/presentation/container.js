const { asClass, createContainer, asFunction, asValue } = require('awilix');
const StartUp = require('./startup');
const Server = require('./server');
const config = require('../config/environments');

const Routes = require('./routes');
const UserRouter = require('./web/users/router');
const HomeRouter = require('./web/home/router');
const BracketRouter = require('./api/bracket/router');
const PrimeNumbersRouter = require('./api/prime-numbers/router');
const SortArrayRouter = require('./api/sort-array/router');
const TournamentRouter = require('./api/tournaments/router');
const MovieRouter = require('./api/movies/router');

const UserController = require('./web/users/user.controller');
const HomeController = require('./web/home/home.controller');
const BracketController = require('./api/bracket/bracket.controller');
const PrimeNumberController = require('./api/prime-numbers/prime-number.controller');
const SortArrayController = require('./api/sort-array/sort-array.controller');
const TournamentController = require('./api/tournaments/tournament.controller');
const MovieController = require('./api/movies/movie.controller');

const UserService = require('../services/user.service');
const MovieService = require('../services/movie.service');

const UserRepository = require('../dal/repositories/user.repository');
const MovieRepository = require('../dal/repositories/movie.repository');

const UserBusiness = require('../domain/user.business');

const { db } = require('../dal/models/mongo');

const container = createContainer();

container
  .register({
    app: asClass(StartUp).singleton(),
    router: asFunction(Routes).singleton(),
    server: asClass(Server).singleton(),
  })
  .register({
    HomeController: asClass(HomeController).singleton(),
    HomeRouter: asFunction(HomeRouter).singleton(),
    UserController: asClass(UserController).singleton(),
    UserRouter: asFunction(UserRouter).singleton(),
    BracketController: asClass(BracketController).singleton(),
    BracketRouter: asFunction(BracketRouter).singleton(),
    PrimeNumberController: asClass(PrimeNumberController).singleton(),
    PrimeNumbersRouter: asFunction(PrimeNumbersRouter).singleton(),
    SortArrayController: asClass(SortArrayController).singleton(),
    SortArrayRouter: asFunction(SortArrayRouter).singleton(),
    TournamentController: asClass(TournamentController).singleton(),
    TournamentRouter: asFunction(TournamentRouter).singleton(),
    MovieController: asClass(MovieController).singleton(),
    MovieRouter: asFunction(MovieRouter).singleton(),
  })
  .register({
    config: asValue(config),
  })
  .register({
    db: asValue(db),
  })
  .register({
    UserService: asClass(UserService).singleton(),
    MovieService: asClass(MovieService).singleton(),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    MovieRepository: asClass(MovieRepository).singleton(),
  })
  .register({
    UserBusiness: asClass(UserBusiness).singleton(),
  });

module.exports = container;
