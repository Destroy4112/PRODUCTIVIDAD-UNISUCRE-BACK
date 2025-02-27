import { IsNotEmpty } from "class-validator";

export class CreateFacultadDto {

    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre : string;
}
