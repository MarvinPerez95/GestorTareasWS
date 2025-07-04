import { EntitySchema } from "typeorm";

export const Usuario = new EntitySchema({
    name: "Usuario",
    tableName: "Usuario",
    columns: {
        UsuarioID: {
            primary: true,
            type: "int",
            generated: true
        },
        Nombre: {
            type: "varchar",
            length: 100
        },
        Correo: {
            type: "varchar",
            length: 100,
            unique: true
        },
        Clave: {
            type: "varchar",
            length: 100
        },
        Rol: {
            type: "varchar",
            length: 25
        },
        Activo: {
            type: "bit",
            default: true,
        }
    },
    relations: {
        Departamento: {
            type: "many-to-one",
            target: "Departamento",
            joinColumn: { name: "DepartamentoID" },
            inverseSide: "Usuarios"
        },
        Tareas: {
            type: "one-to-many",
            target: "Tarea",
            inverseSide: "Usuario"
        },
        Historico: {
            type: "one-to-many",
            target: "HistoricoTarea",
            inverseSide: "usuario"
        },
        Tableros: {
            type: "one-to-many",
            target: "Tablero",
            inverseSide: "usuario"
        },
        TareasAsignadas: {
            type: "many-to-many",
            target: "Tarea",
            joinTable: {
                name: "TareaUsuario",
                joinColumn: {
                    name: "UsuarioID",
                    referencedColumnName: "UsuarioID"
                },
                inverseJoinColumn: {
                    name: "TareaID",
                    referencedColumnName: "TareaID"
                }
            }
        }
    }
});