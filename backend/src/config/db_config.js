const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();
const sequelize = new Sequelize({
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "localhost",
    port: 5432
})

module.exports = sequelize;
