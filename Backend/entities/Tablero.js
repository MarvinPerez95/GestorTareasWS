import { EntitySchema } from "typeorm";

export const Tablero = new EntitySchema({
  name: "Tablero",
  tableName: "Tablero",
  columns: {
    TableroID: {
      primary: true,
      type: "int",
      generated: true
    },
    Nombre: {
      type: "varchar",
      length: 100,
      nullable: true
    },
    Descripcion: {
      type: "varchar",
      length: 255,
      nullable: true
    },
    FechaCreacion: {
      type: "date"
    }
  },
  relations: {
    Departamento: {
      type: "many-to-one",
      target: "Departamento",
      joinColumn: { name: "DepartamentoID" },
      inverseSide: "Tableros"
    },
    Usuario: {
      type: "many-to-one",
      target: "Usuario",
      joinColumn: { name: "UsuarioID" },
      inverseSide: "Tableros"
    },
    Tareas: {
      type: "many-to-many",
      target: "Tarea",
      joinTable: {
        name: "TareaTablero",
        joinColumn: {
          name: "TableroID",
          referencedColumnName: "TableroID"
        },
        inverseJoinColumn: {
          name: "TareaID",
          referencedColumnName: "TareaID"
        }
      },
      inverseSide: "Tableros"
    },
    HistoricoTareas: {
      type: "one-to-many",
      target: "HistoricoTarea",
      inverseSide: "Tablero"
    }
  }
});
