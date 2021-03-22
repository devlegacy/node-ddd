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

  static factoryFromBracket(bracket) {
    const lastIndex = bracket.participants.length - 1;
    const lastParticipant = {
      id: bracket.participants[lastIndex].id,
      seed: bracket.participants[lastIndex].seed,
    };
    const byes = BYE.factory(
      bracket.limit - bracket.participants.length,
      lastParticipant.id,
      lastParticipant.seed
    );
    bracket.participants = bracket.participants.concat(byes);
  }
}

module.exports = BYE;
