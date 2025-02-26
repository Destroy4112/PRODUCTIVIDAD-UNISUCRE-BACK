import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "administradores" })
export class Administrador {

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

    @Column()
    sexo: string;

    @Column({ nullable: true })
    foto: string;

    @OneToOne(() => Usuario, (usuario) => usuario.administrador, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
