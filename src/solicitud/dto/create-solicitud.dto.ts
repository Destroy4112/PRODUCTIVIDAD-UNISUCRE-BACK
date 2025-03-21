import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { Campo } from "src/campo/entities/campo.entity";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Docente } from "src/docente/entities/docente.entity";
import { TipoProducto } from "src/tipo-producto/entities/tipo-producto.entity";

export class CreateSolicitudDto {

    @IsNotEmpty({ message: 'El docente es requerido' })
    docente: Docente;

    @IsNotEmpty({ message: 'La categoria es requerida' })
    categoria: Categoria;

    @IsOptional()
    tipoProducto?: TipoProducto;

    @IsArray()
    @ArrayNotEmpty({ message: 'Los valores de los campos son requeridos' })
    valoresCampos: { campo: Campo, valor: string }[];

    @IsOptional()
    estado?: string;
}
