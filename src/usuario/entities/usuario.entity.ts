import { Administrador } from "src/administrador/entities/administrador.entity";
import { Docente } from "src/docente/entities/docente.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    correo: string;

    @Column()
    password: string;

    @Column()
    rol: string;

    @OneToOne(() => Administrador, admin => admin.usuario)
    administrador: Administrador;

    @OneToOne(() => Docente, docente => docente.usuario)
    docente: Docente;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}