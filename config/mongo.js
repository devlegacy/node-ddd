const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('./environment');
const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
// 'mongodb://localhost:27017/ggtech'
const MONGO_URL = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoDB {
  constructor() {}

  static async connect() {
    if (!MongoDB.connection) {
      try {
        const client = new MongoClient(MONGO_URL, mongoConfig);
        MongoDB.connection = await client.connect();
        MongoDB.db = client.db(DB_NAME);
      } catch (err) {
        console.error(err);
      }
    }

    return MongoDB.connection;
  }
}
/** @type {MongoClient} | undefined */
MongoDB.connection = undefined;
/** @type import('mongodb').Db | undefined */
MongoDB.db = undefined;

module.exports = MongoDB;
