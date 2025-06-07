import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tarea } from "./Tarea";
import { HistoricoTarea } from "./HistoricoTarea";

@Entity()
export class Estado {
  @PrimaryGeneratedColumn()
  EstadoID;

  @Column({ length: 50 })
  Nombre;

  @Column({ length: 100 })
  Descripcion;

  @OneToMany(() => Tarea, tarea => tarea.Estado)
  Tareas;

  @OneToMany(() => HistoricoTarea, h => h.Estado)
  HistoricoTareas;
}
