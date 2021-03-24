const { attributes } = require('structure');
// Model / Entity
const User = attributes({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
})(
  class User {
    getFullName() {
      return `${this.name} ${this.lastName}`;
    }
  }
);

module.exports = User;
