class BracketSort {
  static slaughter(participants) {
    return participants.sort((first, second) => first.seed - second.seed);
  }
}

module.exports = BracketSort;
