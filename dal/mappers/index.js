module.exports = {
  toDBEntity(user) {
    const { id, name, lastName } = user;
    return { id, name, lastName };
  },
};
