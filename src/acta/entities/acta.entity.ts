import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "actas" })
export class Acta {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numero_acta: number;

    @Column()
    fecha_acta: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
