import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";

export class CreateTipoProductoDto {

    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string;

    @IsNotEmpty({ message: 'La categoria es requerida' })
    categoria: Categoria;

    @IsNotEmpty({ message: 'Los puntos son requeridos' })
    puntos: number;
}
