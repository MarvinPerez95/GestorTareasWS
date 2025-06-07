import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Departamento } from "./Departamento.js";
import { Usuario } from "./Usuario.js";
import { Tarea } from "./Tarea.js";
import { HistoricoTarea } from "./HistoricoTarea.js";

@Entity()
export class Tablero {
  @PrimaryGeneratedColumn()
  TableroID;

  @Column({ length: 100 })
  Nombre;

  @Column({ length: 255 })
  Descripcion;

  @Column('date')
  FechaCreacion;

  @ManyToOne(() => Departamento, dep => dep.Tableros)
  Departamento;

  @ManyToOne(() => Usuario, user => user.Tableros)
  Usuario;

  @ManyToMany(() => Tarea, tarea => tarea.Tableros)
  Tareas;

  @OneToMany(() => HistoricoTarea, historico => historico.Tablero)
  HistoricoTareas
}
