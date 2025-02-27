import { IsNotEmpty } from "class-validator";
import { Facultad } from "src/facultad/entities/facultad.entity";

export class CreateProgramaDto {

    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string;

    @IsNotEmpty({ message: 'La facultad es requerida' })
    facultad: Facultad;
}
