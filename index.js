const express = require('express');
const { config } = require('./config/environment');

const app = express();

const { MongoClient } = require('mongodb');

/** @type import('mongodb').MongoClientOptions */
const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const mongoClient = new MongoClient(config.mongoURL, mongoConfig);

app
  .set('port', config.port)
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app
  .get('/', (req, res) => {
    res.send('Hellooooo!!!');
  })
  .get('/numbersPrime/:start/:end', (req, res) => {
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

    res.send(numbersPrime);
  })
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
  .get('/generateBracket', (req, res) => {
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

    // console.log(participantes);

    const _partidos = [];
    for (let i = 0, j = length - 1; i < rondas; i += 1, j -= 1) {
      _partidos.push([
        { id: participantes[i].id },
        { id: participantes[j].id },
      ]);
    }
    // console.log(_partidos);

    // const partidosGGTech = [
    //   _partidos[0],
    //   _partidos[3],
    //   _partidos[1],
    //   _partidos[2],
    // ];
    // console.log(partidosGGTech);

    const partidos = [
      { id: 1, participantes: _partidos[0] },
      { id: 2, participantes: _partidos[3] },
      { id: 3, participantes: _partidos[1] },
      { id: 4, participantes: _partidos[2] },
    ];
    // console.log(JSON.stringify(partidos, null, 2));

    res.send(partidos);
  })
  .get('/tournaments', async (req, res) => {
    let connect;
    let tournaments = null;
    try {
      connect = await mongoClient.connect();
      const db = connect.db('ggtech');

      tournaments = await db
        .collection('Tournaments')
        .aggregate([
          {
            $lookup: {
              from: 'Participants',
              localField: 'participantsid',
              foreignField: '_id',
              as: 'participants',
            },
          },
          {
            $match: {
              status: true,
            },
          },
        ])
        // .find({ status: true })
        .project({
          name: 1,
          description: 1,
          status: 1,
          participants: {
            name: 1,
            username: 1,
          },
        })
        .toArray();
    } catch (err) {
      console.error(err);
    } finally {
      // connect.close();
    }
    res.send(tournaments);
  })
  .get(
    '/tournamentsByNameOrDescription/:nameOrDescription',
    async (req, res) => {
      let connect;
      let tournaments = null;
      try {
        connect = await mongoClient.connect();
        const db = connect.db('ggtech');
        tournaments = await db
          .collection('Tournaments')
          .find({
            $or: [
              { name: { $regex: `.*${req.params.nameOrDescription}.*` } },
              {
                description: { $regex: `.*${req.params.nameOrDescription}.*` },
              },
            ],
          })

          .toArray();
      } catch (err) {
        console.error(err);
      } finally {
        // connect.close();
      }
      res.send(tournaments);
    }
  );

app.listen(app.get('port'), () => {
  console.log(`Server running on http://localhost:${config.port}`);
});

module.exports.getApp = app;
