const { ObjectId } = require('bson');

class BaseRepository {
  constructor(db, collection) {
    this._db = db;
    this.collection = collection;
  }

  async getAll() {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;
    return await mongo.collection(this.collection).find().toArray();
  }

  async getOneById(id) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;
    const entity = await mongo
      .collection(this.collection)
      .findOne({ _id: ObjectId(id) });

    return entity;
  }

  async create(entity) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;
    const createdEntity = await mongo
      .collection(this.collection)
      .insertOne(entity);
    const createdEntityID = createdEntity.insertedId;
    const query = { _id: ObjectId(createdEntityID) };
    const options = { projection: { _id: 0 } };
    const newEntity = await mongo
      .collection(this.collection)
      .findOne(query, options);
    return newEntity;
  }

  async update(id, entity) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;

    const updatedEntity = await mongo
      .collection(this.collection)
      .updateOne({ _id: ObjectId(id) }, { $set: entity }, { upsert: true });
    return updatedEntity.upsertedId || id;
  }

  async delete(id) {
    const db = await this._db;
    /** @type import('mongodb').Db */
    const mongo = db.mongo;

    await mongo.collection(this.collection).deleteOne({ _id: ObjectId(id) });
    return id;
  }
}

module.exports = BaseRepository;
