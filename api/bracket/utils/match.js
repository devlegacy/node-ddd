class Match {
  constructor(participants) {
    this.participants = participants;
    this.length = this.participants.length;
    this.rounds = Math.round(this.length / 2);
    this.matches = [];
    this.ggtechMatches = [];
    this.simpleMatch();
  }

  isBye(participants) {
    return participants.name === 'BYE';
  }

  simpleMatch() {
    for (let i = 0, j = this.length - 1; i < this.rounds; i += 1, j -= 1) {
      this.matches.push([
        {
          id: this.isBye(this.participants[i])
            ? this.participants[i].name
            : this.participants[i].id,
        },
        {
          id: this.isBye(this.participants[j])
            ? this.participants[j].name
            : this.participants[j].id,
        },
      ]);
    }
  }

  ggtechMatch() {
    for (let i = 0, j = this.rounds - 1; i < this.rounds; i += 1, j -= 1) {
      this.ggtechMatches.push(this.matches[i]);
      this.ggtechMatches.push(this.matches[j]);
      if (i + 1 === j) {
        break;
      }
    }
  }
}

module.exports = Match;
