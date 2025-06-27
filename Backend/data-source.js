import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Archivo } from './entities/Archivo.js';
import { Categoria } from './entities/Categoria.js';
import { Departamento } from './entities/Departamento.js';
import { Estado } from './entities/Estado.js';
import { HistoricoTarea } from './entities/HistoricoTarea.js';
import { Prioridad } from './entities/Prioridad.js';
import { Tablero } from './entities/Tablero.js';
import { Tarea } from './entities/Tarea.js';
import { TareaTablero } from './entities/TareaTablero.js';
import { TareaUsuario } from './entities/TareaUsuario.js';
import { Usuario } from './entities/Usuario.js';

export const AppDataSource = new DataSource({
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
        TareaTablero,
        TareaUsuario,
        Usuario
    ],
    options: {
        encrypt: false,
        enableArithAbort: true
    },
});