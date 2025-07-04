import { EntitySchema } from "typeorm";

export const TareaTablero = new EntitySchema({
    name: "TareaTablero",
    tableName: "TareaTablero",
    columns: {
        TareaID: {
            type: "int",
            primary: true
        },
        TableroID: {
            type: "int",
            primary: true
        }
    },
    relations: {
        Tarea: {
            target: "Tarea",
            type: "many-to-one",
            joinColumn: { name: "TareaID" },
            onDelete: "CASCADE",
        },
        Tablero: {
            target: "Tablero",
            type: "many-to-one",
            joinColumn: { name: "TableroID" },
            onDelete: "CASCADE",
        }
    }
});
