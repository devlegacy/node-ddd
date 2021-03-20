const participantes = [
  { id: 1, name: 'St1wers', seed: 1 },
  { id: 2, name: 'Watmans', seed: 2 },
  { id: 3, name: 'Pharaons', seed: 3 },
  { id: 4, name: 'Jedis', seed: 4 },
  { id: 5, name: 'Hoppers', seed: 5 },

  { id: 6, name: 'BYE', seed: 6 },
  { id: 7, name: 'BYE', seed: 7 },
  { id: 8, name: 'BYE', seed: 8 },
];
const length = participantes.length;
const rondas = Math.round(length / 2);
participantes.sort((first, second) => first.seed - second.seed);

console.log(participantes);

const _partidos = [];
for (let i = 0, j = length - 1; i < rondas; i += 1, j -= 1) {
  _partidos.push([{ id: participantes[i].id }, { id: participantes[j].id }]);
}
console.log(_partidos);

const partidosGGTech = [_partidos[0], _partidos[3], _partidos[1], _partidos[2]];
console.log(partidosGGTech);

const partidos = [
  { id: 1, participantes: _partidos[0] },
  { id: 2, participantes: _partidos[3] },
  { id: 3, participantes: _partidos[1] },
  { id: 4, participantes: _partidos[2] },
];
console.log(JSON.stringify(partidos, null, 2));
