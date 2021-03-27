const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const {
  DB_USER,
  DB_PORT,
  DB_HOST,
  DB_PASSWORD,
  DB_NAME,
} = require('../../config/environments');
const USER = encodeURIComponent(DB_USER);
const PASSWORD = encodeURIComponent(DB_PASSWORD);

const { MongoClient, ObjectId } = require('mongodb');
const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URL = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;
console.log(MONGO_URL);
const client = new MongoClient(MONGO_URL, mongoConfig);
const db = client
  .connect()
  .then((connection) => {
    const db = {
      Mongo: connection,
      mongo: connection.db(DB_NAME),
    };

    return db;
  })
  .then((db) => {
    const collections = [];
    fs.readdirSync(__dirname)
      .filter((file) => {
        return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js'
        );
      })
      .forEach((file) => {
        const model = require(path.join(__dirname, file))(db.mongo);

        collections.push(model);
      });

    return Promise.all(collections).then((models) => {
      for (let i = 0; i < models.length; i++) {
        db[models[i].name] = models[i].model;
      }
      return db;
    });
  })
  .catch((err) => console.log(err));
module.exports.db = db;
