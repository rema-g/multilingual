// config/config.ts
import dotenv from "dotenv";
dotenv.config();

const config = {
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD ,
    name: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    dialect: "mysql" as const,
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.EXPIRES_IN as string,
  },
  app: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
};

export default config;
