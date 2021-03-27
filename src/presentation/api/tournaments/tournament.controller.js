class TournamentController {
  async get(req, res, next) {
    try {
      const tournaments = [];
      res.json({
        data: tournaments,
        message: 'Active tournaments',
      });
    } catch (err) {
      next(err);
    }
  }
  async getByNameOrDescription(req, res, next) {
    try {
      const { nameOrDescription } = req.params;
      const tournaments = [nameOrDescription];
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
