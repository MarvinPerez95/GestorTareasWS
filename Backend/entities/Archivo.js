import { EntitySchema } from "typeorm";

export const Archivo = new EntitySchema({
  name: "Archivo",
  tableName: "Archivo",
  columns: {
    ArchivoID: {
      primary: true,
      type: "int",
      generated: true
    },
    Nombre: {
      type: "varchar",
      length: 100,
      nullable: true
    },
    Ruta: {
      type: "text",
      nullable: true
    },
    TipoArchivo: {
      type: "varchar",
      length: 10,
      nullable: true
    },
    Tamanio: {
      type: "int",
      nullable: true
    },
    Fecha: {
      type: "date",
      nullable: true
    }
  },
  relations: {
    Tarea: {
      type: "many-to-one",
      target: "Tarea",
      joinColumn: { name: "TareaID" },
      inverseSide: "Archivos"
    }
  }
});
