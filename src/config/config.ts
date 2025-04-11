import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}

interface SequelizeConfig {
  [key: string]: DBConfig;
}

const config: SequelizeConfig = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'multilingual',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: (process.env.DIALECT as Dialect) || 'mysql',
  },
};

export default config;
