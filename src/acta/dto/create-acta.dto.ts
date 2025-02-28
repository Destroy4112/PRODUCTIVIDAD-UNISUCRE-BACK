import { IsNotEmpty } from "class-validator";

export class CreateActaDto {

    @IsNotEmpty({ message: 'El numero de acta es requerido' })
    numero_acta: number;

    @IsNotEmpty({ message: 'La fecha de acta es requerida' })
    fecha_acta: string;
}
