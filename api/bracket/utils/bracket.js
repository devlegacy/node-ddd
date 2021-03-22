const BracketSort = require('./bracket-sort');
const BYE = require('./bye');
const Match = require('./match');
const Tournament = require('./tournament');

class Bracket {
  constructor(participants, games, limit) {
    this.participants = BracketSort.slaughter(participants);
    this.limit = limit;
    this.participantsLength = this.participants.length;

    this.completeParticipants();

    this.matches = new Match(this.participants);
    this.matches.ggtechMatch();
    this.tournaments = new Tournament(games, this.matches.ggtechMatches);
  }

  completeParticipants() {
    if (this.participantsLength < this.limit) {
      const lastIndex = this.participantsLength - 1;
      const lastParticipant = {
        id: this.participants[lastIndex].id,
        seed: this.participants[lastIndex].seed,
      };
      const byes = BYE.factory(
        this.limit - this.participantsLength,
        lastParticipant.id,
        lastParticipant.seed
      );
      this.participants = this.participants.concat(byes);
    }
  }
}

const participantes = [
  { id: 1, name: 'St1wers', seed: 1 },
  { id: 2, name: 'Watmans', seed: 2 },
  { id: 3, name: 'Pharaons', seed: 3 },
  { id: 4, name: 'Jedis', seed: 4 },
  { id: 5, name: 'Hoppers', seed: 5 },
];
const partidos = [
  { id: 1, participantes: [{ id: undefined }, { id: undefined }] },
  { id: 2, participantes: [{ id: undefined }, { id: undefined }] },
  { id: 3, participantes: [{ id: undefined }, { id: undefined }] },
  { id: 4, participantes: [{ id: undefined }, { id: undefined }] },
];

module.exports = Bracket;
