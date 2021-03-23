const { customBracket } = require('./utils');

class BracketController {
  get(req, res, next) {
    try {
      const participantes = [
        { id: 1, name: 'St1wers', seed: 1 },
        { id: 2, name: 'Watmans', seed: 2 },
        { id: 3, name: 'Pharaons', seed: 3 },
        { id: 4, name: 'Jedis', seed: 4 },
        { id: 5, name: 'Hoppers', seed: 5 },
      ];
      const partidos = [
        { id: 1, participantes: [{ id: undefined }, { id: undefined }] },
        { id: 2, participantes: [{ id: undefined }, { id: undefined }] },
        { id: 3, participantes: [{ id: undefined }, { id: undefined }] },
        { id: 4, participantes: [{ id: undefined }, { id: undefined }] },
      ];

      const bracket = customBracket(participantes, partidos, 8);

      res.status(200).json({
        data: bracket,
        message: `Slaughter bracket.`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BracketController;
