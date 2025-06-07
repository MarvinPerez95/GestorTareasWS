import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from ('typeorm')
import { Usuario } from ('./Usuario')
import { Tablero } from ('./Tablero')

@Entity()
export class Departamento {
    @PrimaryGeneratedColumn()
    DepartamentoID;

    @Column({ length: 100 })
    Nombre;

    @Column({ length: 100, nullable: true })
    Descripcion;

    @OneToMany(() => Usuario, usuario => usuario.Departamento)
    Usuarios;

    @OneToMeny(() => Tablero, tablero => tablero.Departamento)
    Tableros;
}