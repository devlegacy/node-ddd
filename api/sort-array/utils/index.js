/**
 *
 * @param {Array<number>} numbers
 * @returns {Array<number>}
 */
module.exports.sortArray = (numbers) => {
  /** @type Record<string, number> */
  const numbersMap = numbers.reduce((map, number) => {
    if (!(number in map)) {
      map[number] = 0;
    } else {
      map[number]++;
    }
    return map;
  }, {});

  const mapEntries = Object.entries(numbersMap);

  const sortedNumbers = mapEntries
    .sort(
      (firstMapEntry, secondMapEntry) => secondMapEntry[1] - firstMapEntry[1]
    )
    .map((mapEntry) => +mapEntry[0]);

  return sortedNumbers;
};

/**
 *
 * @param {Array<number>} numbers
 * @returns {Array<number>}
 */
module.exports.sortArrayWithRepeated = (numbers) => {
  const numbersMap = numbers.reduce((map, number) => {
    if (!map.has(number)) {
      map.set(number, { count: 0, data: [number] });
    } else {
      map.get(number).count++;
      map.get(number).data.push(number);
    }
    return map;
  }, new Map());

  const mapEntries = Array.from(numbersMap.entries());

  const sortedNumbers = mapEntries
    .sort(
      (firstMapEntry, secondMapEntry) =>
        secondMapEntry[1].count - firstMapEntry[1].count
    )
    .reduce((acc, mapEntry) => acc.concat(mapEntry[1].data), []);

  return sortedNumbers;
};
