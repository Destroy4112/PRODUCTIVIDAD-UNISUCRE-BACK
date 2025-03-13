import { IsNotEmpty, IsOptional } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { TipoProducto } from "src/tipo-producto/entities/tipo-producto.entity";

export class CreateCampoDto {

    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;

    @IsNotEmpty({ message: 'El tipo es requerido' })
    tipo: string;

    @IsOptional()
    tipoProducto: TipoProducto;

    @IsOptional()
    categoria: Categoria;
}
