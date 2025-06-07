import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tablero } from "./Tablero";
import { Tarea } from "./Tarea";
import { Estado } from "./Estado";
import { Usuario } from "./Usuario";

@Entity()
export class HistoricoTarea {
  @PrimaryGeneratedColumn()
  HistoricoID;

  @ManyToOne(() => Tablero, tablero => tablero.TableroID)
  Tablero;

  @ManyToOne(() => Tarea, tarea => tarea.TareaID)
  Tarea;

  @ManyToOne(() => Estado, estado => estado.EstadoID)
  Estado;

  @ManyToOne(() => Usuario, usuario => usuario.UsuarioID)
  Usuario;

  @Column({ length: 100, nullable: true })
  Motivo;

  @Column('date')
  FechaActualizacion;
}
