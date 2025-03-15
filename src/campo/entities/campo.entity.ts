import { Categoria } from "src/categoria/entities/categoria.entity";
import { TipoProducto } from "src/tipo-producto/entities/tipo-producto.entity";
import { ValorCampo } from "src/valor-campo/entities/valor-campo.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "campos" })
export class Campo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    tipo: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.campos, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria;

    @ManyToOne(() => TipoProducto, (tipoProducto) => tipoProducto.campos, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tipo_producto_id' })
    tipoProducto: TipoProducto;

    @OneToMany(() => ValorCampo, (valorCampo) => valorCampo.campo)
    valoresCampos: ValorCampo[]
    
}
