const { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinColumn } = require("typeorm");
const { Departamento } = require("./Departamento");
const { Tarea } = require("./Tarea");
const { HistoricoTarea } = require("./HistoricoTarea");
const { Tablero } = require("./Tablero");

@Entity
export class Usuario {
    @PrimaryGeneratedColumn()
    UsuarioID;

    @Column({ length: 100 })
    Nombre;

    @Column({ length: 100, unique: true })
    Correo;

    @Column({ length: 100 })
    Clave;

    @Column({ length: 25 })
    Rol;

    @ManyToOne(() => Departamento, dep => dep.Usuarios)
    Departamento;

    @OneToMany(() => Tarea, tarea => tarea.Usuario)
    Tareas;

    @OneToMany(() => HistoricoTarea, h => h.usuario)
    Historico;

    @OneToMany(() => Tablero, tablero => tablero.usuario)
    Tableros;

    @ManyToMany(() => Tarea)
    @JoinColumn({
        name: 'TareaUsuario',
        joinColumn: { name: 'UsuarioID', referencedColumnName: 'UsuarioID' },
        inverseJoinColumn: { name: 'TareaID', referencedColumnName: 'TareaID' }
    })
    TareasAsignadas;
}