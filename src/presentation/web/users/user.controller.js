let _userService = null;
class UserController {
  constructor({ UserService }) {
    _userService = UserService;
  }
  sayHello(req, res) {
    res.send({ message: 'Hello world' });
  }
}
module.exports = UserController;
