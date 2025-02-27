import { IsNotEmpty } from "class-validator";

export class CreateTipoProductoDto {

    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string;

    @IsNotEmpty({ message: 'El tipo es requerido' })
    tipo: string;

    @IsNotEmpty({ message: 'Los puntos son requeridos' })
    puntos: number;
}
