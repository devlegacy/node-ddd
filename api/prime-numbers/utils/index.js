/**
 *
 * @param {number} number
 * @returns
 */
const isPrimeNumber = (number) => {
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
};

/**
 *
 * @param {number} start
 * @param {number} end
 * @returns Array<number>
 */
module.exports.calculatePrimeNumbers = (start, end) => {
  const fixedStart = start > 1 ? start : 2;

  // Tip and trick: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/from#generador_de_secuencia_(rango)
  const length = end - fixedStart + 1;
  const naturalNumbers = Array.from({ length }, (_, i) => fixedStart + i);

  const numbersPrime = naturalNumbers.filter(isPrimeNumber);

  return numbersPrime;
};

/**
 *
 * @param {number} start
 * @param {number} end
 * @returns Array<number>
 */
module.exports.calculatePrimeNumbersWithLoop = (start, end) => {
  const fixedStart = start > 1 ? start : 2;
  const numbersPrime = [];
  for (let number = fixedStart; number <= end; number++) {
    if (isPrimeNumber(number)) {
      numbersPrime.push(number);
    }
  }

  return numbersPrime;
};
