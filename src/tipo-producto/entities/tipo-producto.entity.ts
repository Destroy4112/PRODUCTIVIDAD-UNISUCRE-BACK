import { Campo } from "src/campo/entities/campo.entity";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tipos_producto' })
export class TipoProducto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
    @Column()
    puntos: number;

    @ManyToOne(() => Categoria, (categoria) => categoria.tiposProductos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria;

    @OneToMany(() => Campo, (campo) => campo.tipoProducto)
    campos: Campo[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
