//import "reflect-metadata"
const { DataSource } = require("typeorm")

//Importe de las entidades
// import { Departamento } from "./models/Departamento"
// import { Usuario } from "./models/Usuario"
// import { Categoria } from "./models/Categoria"
// import { Tarea } from "./models/Tarea"
// import { Tablero } from "./models/Tablero"
// import { Estado } from "./models/Estado"
// import { Prioridad } from "./models/Prioridad"
// import { HistoricoTarea } from "./models/HistoricoTarea"
// import { Archivo } from "./models/Archivo"

const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "dbAdmin",
    password: "dbAdmin",
    database: "GestorTareas",
    synchronize: false,
    logging: true,
    entities: ['./entities/*.js'],
    //     Departamento,
    //     Usuario,
    //     Categoria,
    //     Estado,
    //     Prioridad,
    //     Tarea,
    //     Archivo,
    //     Tablero,
    //     HistoricoTarea
    // ],
    options: {
        enableArithAbort: true,
        encrypt: false,
    },
})

AppDataSource.initialize()
    .then(() => {
        console.log("Conexion a BD Establecida Correctamente.")
    })
    .catch((error) => {
        console.error("Error al conectar a la Base de Datos", error)
    })

module.exports = {
    AppDataSource
}