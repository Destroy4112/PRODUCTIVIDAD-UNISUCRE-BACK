import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { Campo } from "src/campo/entities/campo.entity";

export class CreateSolicitudDto {

    @IsNotEmpty({ message: 'El docente es requerido' })
    docente: number;

    @IsNotEmpty({ message: 'La categoria es requerida' })
    categoria: number;

    @IsOptional()
    tipoProducto?: number;

    @IsArray()
    @ArrayNotEmpty({ message: 'Los valores de los campos son requeridos' })
    valoresCampos: { campo: Campo, valor: string, archivo: string }[];

    @IsOptional()
    estado?: string;
}
