const faker = require('faker');
const { db } = require('../models/mongo');

const participants = new Array(50).fill(null).map(() => {
  return {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
  };
});

const tournaments = (participants) =>
  new Array(10).fill(null).map((data, i) => {
    const participant = i * 10;
    return {
      name: faker.lorem.words(3),
      participantsid: participants
        .slice(participant, participant + 10)
        .map((participant) => participant._id),
      description: faker.commerce.productDescription(),
      location: faker.address.streetAddress(),
      prices: [
        faker.commerce.price(),
        faker.commerce.price(),
        faker.commerce.price(),
      ],
      country: faker.address.country,
      status: Math.random() < 0.5,
      format: 0,
      organizador: {
        name: faker.name.findName(),
      },
    };
  });

/**
 *
 * @param {import('mongodb').Db} db
 */
const participantsSeeder = async (db) => {
  const participantsCollection = db.collection('Participants');
  try {
    const countParticipants = await participantsCollection.countDocuments();
    if (countParticipants) {
      await participantsCollection.drop();
    }
    await participantsCollection.insertMany(participants);
    console.log('Participants table seeder');
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 * @param {import('mongodb').Db} db
 */
const tournamentsSeeder = async (db) => {
  const tournamentsCollection = db.collection('Tournaments');
  try {
    const countTournaments = await tournamentsCollection.countDocuments();
    if (countTournaments) {
      await tournamentsCollection.drop();
    }
    const participants = await db.collection('Participants').find().toArray();
    await tournamentsCollection.insertMany(tournaments(participants));
    console.log('Tournaments table seeder');
  } catch (err) {
    console.error(err);
  }
};

const executeMigration = async () => {
  const client = await db;

  // console.log(client);

  await participantsSeeder(client.mongo);
  await tournamentsSeeder(client.mongo);
  await client.Mongo.close();
};

executeMigration().catch((err) => {
  console.log(err);
});
