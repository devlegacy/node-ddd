module.exports = {
  userToDBEntity(user) {
    const { name, lastName } = user;
    return { name, lastName };
  },
};
