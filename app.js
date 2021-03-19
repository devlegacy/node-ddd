const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app
  .set('port', port)
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app
  .get('/', (req, res) => {
    res.send('Hellooooo!!!');
  })
  /* EJERCICIO 1 - Genera números primos
   * Genera los números primos del parámetro start a end
   */
  .get('/numbersPrime/:start/:end', (req, res) => {
    // TODO: validate start to be natural number > 1
    // TODO: validate end to be natural number >= start
    let start = +req.params.start || 0;
    const end = +req.params.end || 0;

    // let customStart = 2; //??
    const numbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    const numbersPrime = numbers.filter((number) => {
      // if (number === 1) {
      //   return false;
      // }
      for (let i = 2; i < number; i++) {
        if (number % i === 0) {
          return false;
        }
      }
      return true;
    });

    res.send(numbersPrime);
  })
  /* EJERCICIO 2 - Ordena un Array
   * Ordena el array de numeros en base a la cantidad de veces que se repite
   * el array esta en el body con el nombre "numbers".
   */
  .post('/sortArray', (req, res) => {
    // TODO: Valide numbers is an array of numbers
    /** @type Array<number> */
    const numbers = req.body.numbers || [];
    // TODO: Improve and divide algorith, analyze complex (?)
    const numbersMap = Object.entries(
      numbers.reduce((dictionary, number) => {
        if (!(number in dictionary)) {
          dictionary[number] = 0;
        }
        dictionary[number]++;
        return dictionary;
      }, {})
    )
      .sort((first, second) => second[1] - first[1])
      .map((number) => number[0]);

    res.send(numbersMap);
  })
  /* EJERCICIO 3 - Genera un Bracket Simple

1. Considera los siguientes puntos:

  a. El array [partidos] representa la primera ronda de un Bracket de Eliminación Simple de 8 participantes.
  El primer elemento del array (id:1) es el partido de hasta arriba y así consecutivamente.
  ¿QUÉ ES UN BRACKET? -> https://matchplay.events/handbook/single-elimination-bracket

  b. El array [participantes] son aquellos inscritos que esperan la creación del Bracket de Eliminación Simple
  y ya tienen un seed asignado.

  c. Un 'Seed' representa el nivel de habilidad de un participante, se usa para asignar las posiciones iniciales en
  en un Bracket de Eliminación Simple. Existen varios tipos de ordenamiento, en esta prueba usaremos el tipo Slaughter.
  TIPOS DE ORDENAMIENTO -> https://matchplay.events/handbook/player-pairing

2. Genera una solución al siguiente problema y describe tu lógica detras de ella. (Sin código)

  a. Problema: Te han pedido que ordenes la primera ronda de un Bracket de Eliminación Simple (array [partidos])
  en tipo Slaughter, es decir, el mejor seed deberá efrentarse contra el peor seed, usando los participantes
  inscritos (array [participantes]).
  Ejemplo: { "id": 1, "participantes": [{"id": 1}, {"id": 5}]}

    - Han mencionado que no quieren que los participantes más fuertes (seed: 1 vs seed: 2) se enfrenten en
      la segunda ronda si llegaran a ganar su primer partido.

    - Han dicho que faltan 3 participantes y deberás reemplazar sus id por un BYE.

  Por último, intuyes que usarán este algoritmo para generar otros brackets, por lo cual tal vez deberia funcionar en
  almenos cualquier otro bracket de 8 participantes.

  b. Tu solución:
  */
  .get('/generateBracket', (req, res) => {
    /**
     * Definitions and Acronyms:
     *
     * Bracket:
     * seed:
     * Slaughter:
     *
     * Goal/Objectives
     * Generate a simple bracket
     *
     * Assumptions:
     * El array de participantes no vendrá ordenado
     * El bracket es 1 vs 1 por lo cual es un arreglo par
     * Se asume que si faltan participantes podemos darle ventaja a los participantes más débiles
     * Se asume que el máximo de participantes son 8, TODO: Por confirmar
     *
     * Limitations & Unknowns
     * La fuente de participantes
     * Como se genera el seed
     */
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

    res.send(partidos);
  });

app.listen(app.get('port'), () => {
  console.log(`Server running on http://localhost:${port}`);
});
