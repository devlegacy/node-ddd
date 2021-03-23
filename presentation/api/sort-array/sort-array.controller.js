const { sortArrayWithRepeated } = require('./utils');

class SortArrayController {
  post(req, res, next) {
    try {
      /** @type Array<number> */
      const { numbers } = req.body;
      const sortedNumbers = sortArrayWithRepeated(numbers);
      res.status(200).json({
        data: sortedNumbers,
        message: `Sorted number list.`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SortArrayController;
