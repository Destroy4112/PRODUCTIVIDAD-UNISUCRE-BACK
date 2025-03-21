import { Acta } from "src/acta/entities/acta.entity";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Docente } from "src/docente/entities/docente.entity";
import { EstadoSolicitud } from "src/estado-solicitud/entities/estado-solicitud.entity";
import { TipoProducto } from "src/tipo-producto/entities/tipo-producto.entity";
import { ValorCampo } from "src/valor-campo/entities/valor-campo.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'solicitudes' })
export class Solicitud {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Docente, (docente) => docente.solicitudes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'docente_id' })
    docente: Docente;

    @ManyToOne(() => Categoria, (categoria) => categoria.campos)
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria;

    @ManyToOne(() => TipoProducto, (tipo) => tipo.campos, { nullable: true })
    @JoinColumn({ name: 'tipo_producto_id' })
    tipoProducto: TipoProducto;

    @OneToMany(() => ValorCampo, (valorCampo) => valorCampo.solicitud)
    valoresCampos: ValorCampo[];

    @OneToMany(() => EstadoSolicitud, (estadoSolicitud) => estadoSolicitud.solicitud)
    estados: EstadoSolicitud[];

    @Column({ nullable: true })
    observacion: string;

    @ManyToOne(() => Acta, (acta) => acta.solicitudes, { nullable: true })
    @JoinColumn({ name: 'acta_id' })
    acta: Acta;

    @Column({ nullable: true })
    puntos: number;

    @Column({ nullable: true })
    estado: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}
