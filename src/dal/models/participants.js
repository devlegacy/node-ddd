/**
 *
 * @param {import('mongodb').Db} mongo
 * @returns
 */
module.exports = async (mongo) => {
  const collection = mongo.collection('Participants');
  const count = await collection.countDocuments();
  if (count >= 0) {
    return { name: 'participants', model: collection };
  }
  return {
    name: 'participants',
    model: mongo.createCollection('Participants', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'username', 'email', 'phone'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            username: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            email: {
              bsonType: 'string',
              pattern: '@mongodb.com$',
              description: 'must be a string and is required',
            },
            phone: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
          },
        },
      },
    }),
  };
};
