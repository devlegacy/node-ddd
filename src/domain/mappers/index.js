const User = require('../user');

module.exports = {
  // user from dal, dto, service to user.js
  userToDomainEntity(user) {
    const { id, name, lastName } = user;
    return new User({ id, name, lastName });
  },
};
