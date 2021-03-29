class UserService {
  constructor({ UserBusiness }) {
    this._userBusiness = UserBusiness;
  }

  async getUsers() {
    // return a domain entity
    const users = await this._userBusiness.getUsers();
    // do something
    return users;
  }

  async getUser(id) {
    const user = this._userBusiness.getUser(id);
    return user;
  }

  async createUser(user) {
    const createdUser = await this._userBusiness.createUser(user);
    return createdUser;
  }

  async updateUser(id, user) {
    const updatedUser = await this._userBusiness.updateUser(id, user);
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = this._userBusiness.deleteUser(id);
    return deletedUser;
  }
}

module.exports = UserService;
