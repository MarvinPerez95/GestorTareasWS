const { EntitySchema } = require("typeorm");

const HistoricoTarea = new EntitySchema({
  name: "HistoricoTarea",
  tableName: "HistoricoTarea",
  columns: {
    HistoricoID: {
      primary: true,
      type: "int",
      generated: true
    },
    Motivo: {
      type: "varchar",
      length: 100,
      nullable: true
    },
    FechaActualizacion: {
      type: "date"
    }
  },
  relations: {
    Tablero: {
      type: "many-to-one",
      target: "Tablero",
      joinColumn: true,
      inverseSide: "HistoricoTareas"
    },
    Tarea: {
      type: "many-to-one",
      target: "Tarea",
      joinColumn: true,
      inverseSide: "HistoricoTareas"
    },
    Estado: {
      type: "many-to-one",
      target: "Estado",
      joinColumn: true,
      inverseSide: "HistoricoTareas"
    },
    Usuario: {
      type: "many-to-one",
      target: "Usuario",
      joinColumn: true,
      inverseSide: "Historico"
    }
  }
});

module.exports = { HistoricoTarea };
