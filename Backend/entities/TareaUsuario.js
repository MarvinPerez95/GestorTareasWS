import { EntitySchema } from "typeorm";

export const TareaUsuario = new EntitySchema({
    name: "TareaUsuario",
    tableName: "TareaUsuario",
    columns: {
        TareaID: {
            primary: true,
            type: "int"
        },
        UsuarioID: {
            primary: true,
            type: "int"
        }
    },
    relations: {
        Tarea: {
            type: "many-to-one",
            target: "Tarea",
            joinColumn: { name: "TareaID" },
            onDelete: "CASCADE"
        },
        Usuario: {
            type: "many-to-one",
            target: "Usuario",
            joinColumn: { name: "UsuarioID" },
            onDelete: "CASCADE"
        }
    }
});

