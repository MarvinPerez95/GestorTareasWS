import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tarea } from "./Tarea";

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  CategoriaID;

  @Column({ length: 50 })
  Nombre;

  @Column({ length: 250 })
  Descripcion;

  @OneToMany(() => Tarea, tarea => tarea.Categoria)
  Tareas;
}
