// https://docs.mongodb.com/manual/core/schema-validation/#json-schema
/**
 *
 * @param {import('mongodb').Db} mongo
 * @returns
 */
module.exports = async (mongo) => {
  const collection = mongo.collection('Users');
  const count = await collection.countDocuments();
  if (count >= 0) {
    return { name: 'users', model: collection };
  }
  return {
    name: 'users',
    model: mongo.createCollection('Users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'lastName'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            lastName: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
          },
        },
      },
    }),
  };
};
