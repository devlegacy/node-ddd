class UserRepository {
  constructor({ db }) {
    this._db = db;
  }

  async getUsers() {
    const db = await this._db;
    return await db.mongo.collection('Users').find().toArray();
  }

  async createUser(user) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;
    const newUserInsert = await mongo.collection('Users').insertOne(user);
    const newUserID = newUserInsert.insertedId;
    const query = { _id: newUserID };
    const options = { projection: { _id: 0 } };
    const newUser = await mongo.collection('Users').findOne(query, options);
    return newUser;
  }
}

module.exports = UserRepository;

/**
 * Resolves promises on service with async/await
 */
