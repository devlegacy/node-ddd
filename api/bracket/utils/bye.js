class BYE {
  constructor(id, seed) {
    this.id = id;
    this.name = 'BYE';
    this.seed = seed;
  }

  static factory(amount, fromId = 1, fromSeed = 1) {
    const byes = [];
    for (let i = 0; i < amount; i++) {
      byes.push(new BYE(++fromId, ++fromSeed));
    }
    return byes;
  }
}

module.exports = BYE;
