module.exports = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'qa',
  DB_DRIVER: 'mongo',
  DB_HOST: 'localhost',
  DB_USER: 'user_qa',
  DB_PASSWORD: 'password',
  DB_NAME: 'dbname_qa',
};
