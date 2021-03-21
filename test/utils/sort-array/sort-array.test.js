const { sortArrayWithRepeated } = require('../../../api/sort-array/utils');

describe('Test sorted function', () => {
  it('Should sorted array', () => {
    const input = [
      1,
      2,
      3,
      4,
      5,
      9,
      6,
      7,
      3,
      55,
      3,
      2,
      22,
      6,
      77,
      232,
      35,
      21,
      2,
      456,
      123,
      4,
      5,
    ];
    const expected = [
      2,
      2,
      2,
      3,
      3,
      3,
      4,
      4,
      5,
      5,
      6,
      6,
      1,
      9,
      7,
      55,
      22,
      77,
      232,
      35,
      21,
      456,
      123,
    ];
    const output = sortArrayWithRepeated(input);

    expect(expected).toEqual(output);
  });

  it('Should sorted array - 2', () => {
    const input = [2, 5, 2, 8, 5, 6, 8, 8];
    const expected = [8, 8, 8, 2, 2, 5, 5, 6];
    const output = sortArrayWithRepeated(input);
    expect(expected).toEqual(output);
  });

  it('Should sorted array - 3', () => {
    const input = [2, 5, 2, 6, -1, 9999999, 5, 8, 8, 8];
    const expected = [8, 8, 8, 2, 2, 5, 5, 6, -1, 9999999];
    const output = sortArrayWithRepeated(input);
    expect(output).toEqual(expected);
  });
});
