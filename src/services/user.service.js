const { toDomainEntity } = require('../domain/mappers');

class UserService {
  constructor({ UserRepository }) {
    this._userRepository = UserRepository;
  }

  async getUser() {
    const users = await this._userRepository.getUsers();
    // do something
    return users;
  }

  async createUser(user) {
    user = toDomainEntity(user);

    const newUser = await this._userRepository.createUser(user);
    return newUser;
  }
}

module.exports = UserService;
