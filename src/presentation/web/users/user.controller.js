class UserController {
  constructor({ UserService }) {
    this._userService = UserService;
  }
  sayHello(req, res) {
    res.send({ message: 'Hello world' });
  }
}
module.exports = UserController;
