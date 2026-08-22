require('dotenv').config();

const dbName = process.env.DB_DATABASE || 'projectt';

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || 'mysql',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: dbName,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306
  },
  staging: {
    dialect: process.env.DB_DIALECT || 'mysql',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: dbName,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306
  },
  production: {
    dialect: process.env.DB_DIALECT || 'mysql',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: dbName,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306
  }
};
