import { Campo } from "src/campo/entities/campo.entity";
import { Solicitud } from "src/solicitud/entities/solicitud.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "valores_campo" })
export class ValorCampo {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Solicitud, (solicitud) => solicitud.valoresCampos)
    @JoinColumn({ name: "solicitud_id" })
    solicitud: Solicitud;

    @ManyToOne(() => Campo, (campo) => campo.valoresCampos)
    @JoinColumn({ name: "campo_id" })
    campo: Campo;

    @Column({ nullable: true })
    valor?: string;

    @Column({ nullable: true })
    archivo?: string;
}
