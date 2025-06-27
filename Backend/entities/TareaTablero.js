import { EntitySchema } from "typeorm";

export const TareaTablero = new EntitySchema({
    name: "TareaTablero",
    tableName: "TareaTablero",
    columns: {
        TareaID: {
            primary: true,
            type: "int"
        },
        TableroID: {
            primary: true,
            type: "int"
        }
    },
    relations: {
        tarea: {
            type: "many-to-one",
            target: "Tarea",
            joinColumn: { name: "TareaID" },
            onDelete: "CASCADE"
        },
        tablero: {
            type: "many-to-one",
            target: "Tablero",
            joinColumn: { name: "TableroID" },
            onDelete: "CASCADE"
        }
    }
});

