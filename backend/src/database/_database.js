const pg = require('pg')
const dotenv = require('dotenv');

dotenv.config();

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'desafio_clientes',
    password: 'root',
    port: 5432,
})

module.exports = client;