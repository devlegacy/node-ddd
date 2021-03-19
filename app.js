const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

const { MongoClient, MongoClientOptions } = require('mongodb');

// NOTE: Only for dev purposes -> "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority"
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/ggtech';

/** @type MongoClientOptions */
const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const mongoClient = new MongoClient(mongoURL, mongoConfig);

app
  .set('port', port)
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app
  .get('/', (req, res) => {
    res.send('Hellooooo!!!');
  })
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
      // TODO: Fix (?)
      if (number === 1) {
        return false;
      }
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
    ];
    const partidos = [
      { id: 1, participantes: [{ id: undefined }, { id: undefined }] },
      { id: 2, participantes: [{ id: undefined }, { id: undefined }] },
      { id: 3, participantes: [{ id: undefined }, { id: undefined }] },
      { id: 4, participantes: [{ id: undefined }, { id: undefined }] },
    ];

    res.send(partidos);
  })
  .get('/tournaments', (req, res) => {
    res.send(null);
  });

app.listen(app.get('port'), () => {
  console.log(`Server running on http://localhost:${port}`);
});
