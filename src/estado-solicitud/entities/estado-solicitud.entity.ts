import { Solicitud } from "src/solicitud/entities/solicitud.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('estados_solicitud')
export class EstadoSolicitud {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Solicitud, (solicitud) => solicitud.estados, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'solicitud_id' })
    solicitud: Solicitud;

    @Column()
    estado: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;

}
