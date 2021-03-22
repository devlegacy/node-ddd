const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { bracketRouter } = require('../api/bracket/router');
const { primeNumbersRouter } = require('../api/prime-numbers/router');
const { sortArrayRouter } = require('../api/sort-array/router');
const { config } = require('../config/environment');
const { homeRouter } = require('../services/home/router');

/** @type import('mongodb').MongoClientOptions */
const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const mongoClient = new MongoClient(config.mongoURL, mongoConfig);
router
  .use('/', homeRouter)
  .use('/numbersPrime', primeNumbersRouter)
  .use('/sortArray', sortArrayRouter)
  .use('/generateBracket', bracketRouter);
router

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

module.exports = router;
