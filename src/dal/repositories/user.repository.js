const { ObjectId } = require('bson');

class UserRepository {
  constructor({ db }) {
    this._db = db;
  }

  async getUsers() {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;
    return await mongo.collection('Users').find().toArray();
  }

  async getUser(id) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;
    const user = await mongo.collection('Users').findOne({ _id: ObjectId(id) });

    return user;
  }

  async createUser(user) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;
    const newUserInsert = await mongo.collection('Users').insertOne(user);
    const newUserID = newUserInsert.insertedId;
    const query = { _id: ObjectId(newUserID) };
    const options = { projection: { _id: 0 } };
    const newUser = await mongo.collection('Users').findOne(query, options);
    return newUser;
  }

  async updateUser(id, data) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;

    const movie = await mongo
      .collection('Users')
      .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    return movie.upsertedId || id;
  }

  async deleteUser(id) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;

    await mongo.collection('Users').deleteOne({ _id: ObjectId(id) });
    return id;
  }
}

module.exports = UserRepository;

/**
 * Resolves promises on service with async/await
 */
