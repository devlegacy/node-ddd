const BracketSort = require('./bracket-sort');
const BYE = require('./bye');
const Match = require('./match');
const MatchSort = require('./match-sort');
const Tournament = require('./tournament');

class Bracket {
  constructor(participants, games, limit) {
    this.participants = participants;
    this.games = games;
    this.limit = limit;

    this.completeParticipantsWithByes();
  }

  generateSlaughterMatches() {
    this.participants = BracketSort.slaughter(this.participants);
    this.match = new Match(this.participants);
    this.match.simpleMatch();
    this.matches = new MatchSort(this.match).ggtech();
    this.tournaments = new Tournament(this.games, this.matches);
  }

  completeParticipantsWithByes() {
    if (this.participants.length < this.limit) {
      BYE.factoryFromBracket(this);
    }
  }
}

module.exports = Bracket;
