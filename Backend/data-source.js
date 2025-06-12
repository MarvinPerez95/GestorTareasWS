//import "reflect-metadata"
require('dotenv').config();
const { DataSource } = require('typeorm')

const AppDataSource = new DataSource({
    type: 'mssql',
    host: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ['./entities/*.js'],
    options: {
        //enableArithAbort: true,
        encrypt: false
    },
})

module.exports = {
    AppDataSource
}