const { ObjectId } = require('bson');

class MovieRepository {
  constructor({ db }) {
    this._db = db;
  }

  async getMovies(collection, query) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;

    return await mongo.collection(collection).find(query).toArray();
  }

  async getMovie(collection, id) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;

    const movie = await mongo
      .collection(collection)
      .findOne({ _id: ObjectId(id) });

    return movie;
  }

  async createMovie(collection, data) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;
    const movie = await mongo.collection(collection).insertOne(data);
    return movie.insertedId;
  }

  async updateMovie(collection, id, data) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;

    const movie = await mongo
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    return movie.upsertedId || id;
  }

  async deleteMovie(collection, id) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;

    await mongo.collection(collection).deleteOne({ _id: id });
    return id;
  }
}

module.exports = MovieRepository;
