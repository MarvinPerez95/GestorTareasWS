import { EntitySchema } from "typeorm";

export const Tarea = new EntitySchema({
  name: "Tarea",
  tableName: "Tarea",
  columns: {
    TareaID: {
      primary: true,
      type: "int",
      generated: true
    },
    Titulo: {
      type: "varchar",
      length: 50
    },
    Descripcion: {
      type: "varchar",
      length: 100,
      nullable: true
    },
    FechaCreacion: {
      type: "date",
      default: () => "GETDATE()"
    },
    FechaLimite: {
      type: "date"
    },
    Contenido: {
      type: "text"
    },
    Activo: {
      type: "bit"
    }
  },
  relations: {
    Categoria: {
      type: "many-to-one",
      target: "Categoria",
      joinColumn: { name: "CategoriaID" },
      inverseSide: "Tareas"
    },
    Usuario: {
      type: "many-to-one",
      target: "Usuario",
      joinColumn: { name: "UsuarioID" },
      inverseSide: "Tareas"
    },
    Estado: {
      type: "many-to-one",
      target: "Estado",
      joinColumn: { name: "EstadoID" },
      inverseSide: "Tareas"
    },
    Prioridad: {
      type: "many-to-one",
      target: "Prioridad",
      joinColumn: { name: "PrioridadID" },
      inverseSide: "Tareas"
    },
    Archivos: {
      type: "one-to-many",
      target: "Archivo",
      inverseSide: "Tarea"
    },
    Asignados: {
      type: "many-to-many",
      target: "Usuario",
      joinTable: {
        name: "TareaUsuario",
        joinColumn: {
          name: "TareaID",
          referencedColumnName: "TareaID"
        },
        inverseJoinColumn: {
          name: "UsuarioID",
          referencedColumnName: "UsuarioID"
        }
      },
      inverseSide: "TareasAsignadas"
    },
    Tableros: {
      type: "many-to-many",
      target: "Tablero",
      joinTable: {
        name: "TareaTablero",
        joinColumn: {
          name: "TareaID",
          referencedColumnName: "TareaID"
        },
        inverseJoinColumn: {
          name: "TableroID",
          referencedColumnName: "TableroID"
        }
      },
      inverseSide: "Tareas"
    },
    HistoricoTareas: {
      type: "one-to-many",
      target: "HistoricoTarea",
      inverseSide: "Tarea"
    }
  }
});

