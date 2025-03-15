import { Categoria } from "src/categoria/entities/categoria.entity";
import { Docente } from "src/docente/entities/docente.entity";
import { TipoProducto } from "src/tipo-producto/entities/tipo-producto.entity";
import { ValorCampo } from "src/valor-campo/entities/valor-campo.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    fecha: string;
}
