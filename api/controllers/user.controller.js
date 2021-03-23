class UserController {
  constructor() {}
  sayHello(req, res) {
    res.send({ message: 'Hello world' });
  }
}
module.exports = UserController;
