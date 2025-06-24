const { EntitySchema } = require("typeorm");

const Categoria = new EntitySchema({
  name: "Categoria",
  tableName: "Categoria",
  columns: {
    CategoriaID: {
      primary: true,
      type: "int",
      generated: true
    },
    Nombre: {
      type: "varchar",
      length: 50,
      nullable: true
    },
    Descripcion: {
      type: "varchar",
      length: 250,
      nullable: true
    }
  },
  relations: {
    Tareas: {
      type: "one-to-many",
      target: "Tarea",
      inverseSide: "Categoria"
    }
  }
});

module.exports = { Categoria };
