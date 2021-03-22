class Tournament {
  constructor(games, matches) {
    this.games = games;
    this.matches = matches;

    this.make();
  }

  make() {
    for (let i = 0; i < this.games.length; i++) {
      console.log(this.games[i].participantes, this.matches[i]);
      this.games[i].participantes = this.matches[i];
    }
  }
}

module.exports = Tournament;
