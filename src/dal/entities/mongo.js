const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
// const {
//   DB_USER,
//   DB_PORT,
//   DB_HOST,
//   DB_PASSWORD,
//   DB_NAME,
// } = require('../../config/environments');
// const USER = encodeURIComponent(DB_USER);
// const PASSWORD = encodeURIComponent(DB_PASSWORD);

const { MongoClient, ObjectId } = require('mongodb');
const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const MONGO_URL = `mongodb+srv://db_user_ggtech:4Fc98JsHiIn6hDNQ@cluster0.bqel9.mongodb.net/ggtech?retryWrites=true&w=majority`;
// const MONGO_URL = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;
// 'mongodb://localhost:27017/ggtech'
const Mongo = new MongoClient(MONGO_URL, mongoConfig);
const db = {};

(async () => {
  try {
    db.Mongo = await Mongo.connect();
    db.mongo = Mongo.db('ggtech');

    fs.readdirSync(__dirname)
      .filter((file) => {
        return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js'
        );
      })
      .forEach(async (file) => {
        const model = await require(path.join(__dirname, file))(db.mongo);
        db[model.name] = model.model;
        // console.log('----->', db[model.name]);
      });
    // Object.keys(db).forEach((modelName) => {
    //   if (db[modelName].associate) {
    //     db[modelName].associate(db);
    //   }
    // });
  } catch (err) {
    console.error(err);
  }
})();
(async () => console.log(await db.participants.find().toArray()))();

// module.exports = db;
