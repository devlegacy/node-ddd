module.exports = {
  userToDBEntity(user) {
    const { id, name, lastName } = user;
    return { id, name, lastName };
  },
};
