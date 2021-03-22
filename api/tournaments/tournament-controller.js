const Tournament = require('./tournament');
const tournament = new Tournament();

class TournamentController {
  static async get(req, res, next) {
    try {
      const tournaments = await tournament.get();
      res.json({
        data: tournaments,
        message: 'Active tournaments',
      });
    } catch (err) {
      next(err);
    }
  }
  static async getByNameOrDescription(req, res, next) {
    try {
      const { nameOrDescription } = req.params;
      const tournaments = await tournament.getByNameOrDescription(
        nameOrDescription
      );
      res.json({
        data: tournaments,
        message: 'Tournaments by name or description',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TournamentController;
