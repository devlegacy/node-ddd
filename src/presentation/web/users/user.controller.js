let _userService = null;
class UserController {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async getUsers(req, res) {
    const users = await _userService.getUsers();
    res.send({ message: 'Get users', data: users });
  }

  async createUser(req, res) {
    const { body } = req;
    const user = await _userService.createUser(body);
    res.send({ message: 'Get users', data: user });
  }
}
module.exports = UserController;
