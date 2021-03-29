const UserDTO = require('./dto/user');
const mapper = require('automapper-js');

let _userService = null;
class UserController {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async index(req, res) {
    let users = await _userService.getUsers();
    users = users.map((user) => mapper(UserDTO, user));
    res.send({ message: 'Get users', data: users });
  }

  async show(req, res) {
    const { id } = req.params;
    let user = await _userService.getUser(id);
    user = mapper(UserDTO, user);
    res.send({ message: 'Get user', data: user });
  }

  async create(req, res) {
    const { body } = req;
    let user = await _userService.createUser(body);
    user = mapper(UserDTO, user);
    res.send({ message: 'Created user', data: user });
  }

  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    let user = await _userService.updateUser(id, body);
    user = mapper(UserDTO, user);
    res.send({ message: 'Updated user', data: user });
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await _userService.deleteUser(id);
    res.send({ message: 'Deleted user', data: user });
  }
}
module.exports = UserController;
