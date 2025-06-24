//import "reflect-metadata"
require('dotenv').config();
const { DataSource } = require('typeorm')
const { Archivo } = require('./entities/Archivo')
const { Categoria } = require('./entities/Categoria')
const { Departamento } = require('./entities/Departamento')
const { Estado } = require('./entities/Estado')
const { HistoricoTarea } = require('./entities/HistoricoTarea')
const { Prioridad } = require('./entities/Prioridad')
const { Tablero } = require('./entities/Tablero')
const { Tarea } = require('./entities/Tarea')
const { Usuario } = require('./entities/Usuario')

const AppDataSource = new DataSource({
    type: 'mssql',
    host: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        Archivo,
        Categoria,
        Departamento,
        Estado,
        HistoricoTarea,
        Prioridad,
        Tablero,
        Tarea,
        Usuario
    ],
    options: {
        encrypt: false,
        enableArithAbort: true
    },
})

module.exports = {
    AppDataSource
}