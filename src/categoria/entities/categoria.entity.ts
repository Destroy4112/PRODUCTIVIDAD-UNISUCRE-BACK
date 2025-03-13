import { Campo } from "src/campo/entities/campo.entity";
import { TipoProducto } from "src/tipo-producto/entities/tipo-producto.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "categorias" })
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => TipoProducto, (tipoProducto) => tipoProducto.categoria)
    tiposProductos: TipoProducto[];

    @OneToMany(() => Campo, (campo) => campo.categoria)
    campos: Campo[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
