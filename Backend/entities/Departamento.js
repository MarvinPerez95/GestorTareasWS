import { EntitySchema } from "typeorm";

export const Departamento = new EntitySchema({
    name: "Departamento",
    tableName: "Departamento",
    columns: {
        DepartamentoID: {
            primary: true,
            type: "int",
            generated: true
        },
        Nombre: {
            type: "varchar",
            length: 100
        },
        Descripcion: {
            type: "varchar",
            length: 100,
            nullable: true
        },
        Activo: {
            type: "bit",
            default: true
        }
    },
    relations: {
        Usuarios: {
            type: "one-to-many",
            target: "Usuario",
            inverseSide: "Departamento"
        },
        Tableros: {
            type: "one-to-many",
            target: "Tablero",
            inverseSide: "Departamento"
        }
    }
});
