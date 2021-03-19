const participantes = [
  { id: 1, name: 'St1wers', seed: 1 },
  { id: 2, name: 'Watmans', seed: 2 },
  { id: 3, name: 'Pharaons', seed: 3 },
  { id: 4, name: 'Jedis', seed: 4 },
  { id: 5, name: 'Hoppers', seed: 5 },
  // { id: 6, name: 'Mats', seed: 6 },
];

participantes.sort((first, second) => first.seed - second.seed);
const length = participantes.length;
const rondas = Math.round(length / 2);

console.log(length, rondas);

for (let i = 0, j = length - 1; i < rondas; i += 1, j -= 1) {
  console.log([{ id: participantes[i].id }, { id: participantes[j].id }]);
}

console.log('a', [
  [{ id: 1 }, { id: 5 }],
  [{ id: 2 }, { id: 4 }],
  [{ id: 3 }, { id: 'BYE' }],
]);
console.log('b', [
  [{ id: 1 }, { id: 5 }],
  [{ id: 2 }, { id: 4 }],
  [{ id: 3 }, { id: 'BYE' }],
  [{ id: 'BYE' }, { id: 'BYE' }],
]);
console.log('c', [
  [{ id: 1 }, { id: 5 }],
  [{ id: 2 }, { id: 'BYE' }],
  [{ id: 3 }, { id: 'BYE' }],
  [{ id: 4 }, { id: 'BYE' }],
]);
console.log('D', [
  [{ id: 1 }, { id: 5 }],
  [{ id: 4 }, { id: 'BYE' }],
  [{ id: 2 }, { id: 'BYE' }],
  [{ id: 3 }, { id: 'BYE' }],
]);
