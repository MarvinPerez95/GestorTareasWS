import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tarea } from "./Tarea";

@Entity()
export class Prioridad {
  @PrimaryGeneratedColumn()
  PrioridadID;

  @Column({ length: 25 })
  Nombre;

  @Column('int')
  Nivel;

  @Column({ length: 10 })
  Color;

  @Column({ length: 25 })
  NombreColor;

  @OneToMany(() => Tarea, tarea => tarea.Prioridad)
  Tareas;
}
