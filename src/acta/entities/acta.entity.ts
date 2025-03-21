import { Solicitud } from "src/solicitud/entities/solicitud.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "actas" })
export class Acta {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numero_acta: number;

    @Column()
    fecha_acta: string;

    @OneToMany(() => Solicitud, solicitud => solicitud.acta)
    solicitudes: Solicitud[]

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
