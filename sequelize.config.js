require('ts-node/register');        
require('dotenv').config(); 

const config = require('./src/config/config.ts').default;

module.exports = config;