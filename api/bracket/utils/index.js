const Bracket = require('./bracket');

module.exports.makeBracket = (participantes, partidos) => {
  participantes = [
    ...participantes,
    { id: 6, name: 'BYE', seed: 6 },
    { id: 7, name: 'BYE', seed: 7 },
    { id: 8, name: 'BYE', seed: 8 },
  ];

  const length = participantes.length;
  const rondas = Math.round(length / 2);
  participantes.sort((first, second) => first.seed - second.seed);

  const _partidos = [];
  for (let i = 0, j = length - 1; i < rondas; i += 1, j -= 1) {
    _partidos.push([{ id: participantes[i].id }, { id: participantes[j].id }]);
  }

  const partidosGGTech = [
    _partidos[0],
    _partidos[3],
    _partidos[1],
    _partidos[2],
  ];

  partidos = [
    { id: 1, participantes: partidosGGTech[0] },
    { id: 2, participantes: partidosGGTech[1] },
    { id: 3, participantes: partidosGGTech[2] },
    { id: 4, participantes: partidosGGTech[3] },
  ];

  return partidos;
};

module.exports.customBracket = (participantes, partidos, limit = 8) => {
  const bracket = new Bracket(participantes, partidos, limit);
  bracket.generateSlaughterMatches();
  return bracket.tournaments.games;
};
