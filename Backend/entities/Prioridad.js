const { EntitySchema } = require("typeorm");

const Prioridad = new EntitySchema({
  name: "Prioridad",
  tableName: "Prioridad",
  columns: {
    PrioridadID: {
      primary: true,
      type: "int",
      generated: true
    },
    Nombre: {
      type: "varchar",
      length: 25
    },
    Nivel: {
      type: "int"
    },
    Color: {
      type: "varchar",
      length: 10
    },
    NombreColor: {
      type: "varchar",
      length: 25,
      nullable: true
    }
  },
  relations: {
    Tareas: {
      type: "one-to-many",
      target: "Tarea",
      inverseSide: "Prioridad"
    }
  }
});

module.exports = { Prioridad };
