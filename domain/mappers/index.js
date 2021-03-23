const User = require('../user');

module.exports = {
  toDomainEntity(user) {
    const { id, name, lastName } = user;
    return new User({ id, name, lastName });
  },
};
