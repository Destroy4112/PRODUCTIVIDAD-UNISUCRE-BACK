import { IsNotEmpty } from "class-validator";

export class CreateCategoriaDto {

    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string;
}
