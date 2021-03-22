class MatchSort {
  constructor(match) {
    this.match = match;
    this.matches = [];
  }
  ggtech() {
    for (
      let i = 0, j = this.match.rounds - 1;
      i < this.match.rounds;
      i += 1, j -= 1
    ) {
      this.matches.push(this.match.matches[i]);
      this.matches.push(this.match.matches[j]);
      if (i + 1 === j) {
        break;
      }
    }

    return this.matches;
  }
}

module.exports = MatchSort;
