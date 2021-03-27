const { userToDBEntity } = require('../dal/mappers');
const { userToDomainEntity } = require('../domain/mappers');

class UserService {
  constructor({ UserRepository }) {
    this._userRepository = UserRepository;
  }

  async getUsers() {
    const users = await this._userRepository.getUsers();
    // do something
    return users.map(userToDomainEntity);
  }

  async createUser(user) {
    user = userToDBEntity(user);

    const newUser = await this._userRepository.createUser(user);
    return newUser;
  }
}

module.exports = UserService;
