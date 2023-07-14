import {Sequelize} from "sequelize";
const env = process.env.NODE_ENV || 'development';
const config = require('./databaseConfig')[env];

export const db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
});

