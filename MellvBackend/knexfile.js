require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: path.join(__dirname, '/database/migrations')
    },
  },

  testing: {
    client: 'pg',
    connection: process.env.DB_URL_TEST,
    migrations: {
      directory: './database/migrations',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './database/migrations',
    },
  },

};
