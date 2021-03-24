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
const MONGO_URL = `mongodb+srv://db_user_ggtech:sQ4Dzd8bgZ2Jr0D3@cluster0.bqel9.mongodb.net/ggtech?retryWrites=true&w=majority`;
// const MONGO_URL = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;
// 'mongodb://localhost:27017/ggtech'
const Mongo = new MongoClient(MONGO_URL, mongoConfig);
const db = {};

(async () => {
  try {
    db.Mongo = await Mongo.connect();
    db.mongo = Mongo.db('ggtech');
    //mongo =  Mongo.db(DB_NAME);
  } catch (err) {
    console.error(err);
  }
})();

console.log(db.Mongo);

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(mongo);
//     db[model.name] = model.model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// module.exports = db;
