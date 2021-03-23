const { calculatePrimeNumbers } = require('./utils');

class PrimeNumberController {
  get(req, res, next) {
    try {
      const { start, end } = req.params;
      const numbersPrime = calculatePrimeNumbers(+start, +end);

      res.status(200).json({
        data: numbersPrime,
        message: `List of prime numbers from ${start} to ${end}. Count: ${numbersPrime.length}.`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PrimeNumberController;
