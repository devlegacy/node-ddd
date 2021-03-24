// https://docs.mongodb.com/manual/core/schema-validation/#json-schema

module.exports = (mongo) => {
  return {
    name: 'users',
    model: mongo.createCollection('users', {
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
