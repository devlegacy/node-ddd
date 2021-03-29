/**
 *
 * @param {import('mongodb').Db} mongo
 * @returns
 */
module.exports = async (mongo) => {
  const collection = mongo.collection('Tournaments');
  const count = await collection.countDocuments();
  if (count >= 0) {
    return { name: 'tournaments', model: collection };
  }
  return {
    name: 'tournaments',
    model: mongo.createCollection('Tournaments', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [
            'name',
            'participantsid',
            'description',
            'location',
            'prices',
            'country',
            'status',
            'format',
            'organizador',
          ],
          properties: {
            name: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            participantsid: {},
            description: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            location: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            prices: {
              bsonType: 'array',
              description: 'must be a array and is required',
            },
            country: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            status: {
              bsonType: 'bool',
              description: 'must be a bool and is required',
            },
            format: {
              bsonType: 'double',
              description: 'must be a double and is required',
            },
            organizador: {
              name: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
            },
          },
        },
      },
    }),
  };
};
