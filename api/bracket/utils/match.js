class Match {
  constructor(participants) {
    this.participants = participants;
    this.length = this.participants.length;
    this.rounds = Math.round(this.length / 2);
    this.matches = [];
  }

  participantIsBye(participants) {
    return participants.name === 'BYE';
  }

  simpleMatch() {
    for (let i = 0, j = this.length - 1; i < this.rounds; i += 1, j -= 1) {
      this.matches.push([
        {
          id: this.participantIsBye(this.participants[i])
            ? this.participants[i].name
            : this.participants[i].id,
        },
        {
          id: this.participantIsBye(this.participants[j])
            ? this.participants[j].name
            : this.participants[j].id,
        },
      ]);
    }
  }
}

module.exports = Match;
