const { EntitySchema } = require("typeorm");

const Estado = new EntitySchema({
  name: "Estado",
  tableName: "Estado",
  columns: {
    EstadoID: {
      primary: true,
      type: "int",
      generated: true
    },
    Nombre: {
      type: "varchar",
      length: 50
    },
    Descripcion: {
      type: "varchar",
      length: 100,
      nullable: true
    }
  },
  relations: {
    Tareas: {
      type: "one-to-many",
      target: "Tarea",
      inverseSide: "Estado"
    },
    HistoricoTareas: {
      type: "one-to-many",
      target: "HistoricoTarea",
      inverseSide: "Estado"
    }
  }
});

module.exports = { Estado };
