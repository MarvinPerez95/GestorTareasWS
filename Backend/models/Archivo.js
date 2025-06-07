import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tarea } from "./Tarea";

@Entity()
export class Archivo {
  @PrimaryGeneratedColumn()
  ArchivoID;

  @Column({ length: 100 })
  Nombre;

  @Column("text")
  Ruta;

  @Column({ length: 10 })
  TipoArchivo;

  @Column('int')
  Tamanio;

  @Column('date')
  Fecha;

  @ManyToOne(() => Tarea, tarea => tarea.Archivos)
  Tarea;
}
