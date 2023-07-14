require('dotenv').config();

const development = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "@Augusto1993",
  database: process.env.DB_DATABASE || "auth_jwt_modelo",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",
  port: process.env.DB_PORT || 3306,

  // condiguração para Seeds
  seederStorage: "sequelize",
  seederStorageTableName: "seeds",

  // configuração para Migrations
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations",
};

const production = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "@Augusto1993",
  database: process.env.DB_DATABASE || "auth_jwt_modelo",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",
  port: process.env.DB_PORT || 3306,

  // condiguração para Seeds
  seederStorage: "sequelize",
  seederStorageTableName: "seeds",

  // configuração para Migrations
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations",
};

module.exports = {
  development,
  production,
};
