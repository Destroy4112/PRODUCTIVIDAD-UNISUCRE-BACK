import { Programa } from "src/programa/entities/programa.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'docentes' })
export class Docente {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nombres: string;

    @Column({ nullable: false })
    apellidos: string;

    @Column({ unique: true })
    identificacion: string;

    @Column()
    telefono: string;

    @ManyToOne(() => Programa, (programa) => programa.docentes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'programa_id' })
    programa: Programa;

    @Column({ nullable: true })
    foto: string;

    @OneToOne(() => Usuario, (usuario) => usuario.docente, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
