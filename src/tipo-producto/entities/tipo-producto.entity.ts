import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tipos_producto' })
export class TipoProducto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.tiposProductos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria;

    @Column()
    puntos: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
