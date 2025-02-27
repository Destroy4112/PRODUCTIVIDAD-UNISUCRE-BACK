import { Docente } from "src/docente/entities/docente.entity";
import { Facultad } from "src/facultad/entities/facultad.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'programas' })
export class Programa {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Facultad, facultad => facultad.programas)
    @JoinColumn({ name: 'facultad_id' })
    facultad: Facultad;

    @OneToMany(() => Docente, docente => docente.programa, { onDelete: 'CASCADE' })
    docentes: Docente[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
