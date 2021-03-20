require('dotenv').config();

const config = {
  development: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8080,
  // * NOTE: Only for dev purposes -> "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority"
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/ggtech',
};

module.exports = { config };
