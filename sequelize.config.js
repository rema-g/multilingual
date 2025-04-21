require('ts-node/register');        
require('dotenv').config(); 

const config = require('./src/config/config.ts').default;

module.exports = {
  development: {
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
  }
};