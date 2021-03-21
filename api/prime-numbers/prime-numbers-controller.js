class PrimeNumbersController {
  static get(req, res, next) {
    try {
      // TODO: validate start to be natural number > 1 (?)
      // TODO: validate end to be natural number >= start

      let start = +req.params.start || 0;
      const end = +req.params.end || 0;

      const fixedStart = start > 1 ? start : 2;
      const length = end - fixedStart + 1;
      const naturalNumbers = Array.from({ length }, (_, i) => fixedStart + i);

      const numbersPrime = naturalNumbers.filter((number) => {
        for (let i = 2; i < number; i++) {
          if (number % i === 0) {
            return false;
          }
        }
        return true;
      });
      res.status(200).json({
        data: numbersPrime,
        message: `List of prime numbers from ${start} to ${end}`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PrimeNumbersController;
