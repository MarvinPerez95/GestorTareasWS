const { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } = require('typeorm');
const Categoria = require('./Categoria');
const Usuario = require('./Usuario');
const Estado = require('./Estado');
const Prioridad = require('./Prioridad');
const Archivo = require('./Archivo');
const Tablero = require('./Tablero');
const HistoricoTarea = require('./HistoricoTarea');

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn()
  TareaID;

  @Column({ length: 50 })
  Titulo;

  @Column({ length: 100 })
  Descripcion;

  @Column('date')
  FechaCreacion;

  @Column('date')
  FechaLimite;

  @Column('text')
  Contenido;

  @Column('bit')
  Activo;

  @ManyToOne(() => Categoria, cat => cat.Tareas)
  Categoria;

  @ManyToOne(() => Usuario, user => user.Tareas)
  Usuario;

  @ManyToOne(() => Estado, est => est.Tareas)
  Estado;

  @ManyToOne(() => Prioridad, pri => pri.Tareas)
  Prioridad;

  @OneToMany(() => Archivo, archivo => archivo.Tarea)
  Archivos;

  @ManyToMany(() => Usuario, usuario => usuario.TareasAsignadas)
  Asignados;

  @ManyToMany(() => Tablero, tablero => tablero.Tareas)
  @JoinTable({
    name: 'TareaTablero',
    joinColumn: { name: 'TareaID', referencedColumnName: 'TareaID' },
    inverseJoinColumn: { name: 'TableroID', referencedColumnName: 'TableroID' }
  })
  Tableros;

  @OneToMany(() => HistoricoTarea, histo => histo.Tarea)
  HistoricoTareas;
}

