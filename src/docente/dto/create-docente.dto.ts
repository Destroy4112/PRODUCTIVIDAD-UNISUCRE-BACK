import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Programa } from "src/programa/entities/programa.entity";

export class CreateDocenteDto {

    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombres: string;

    @IsNotEmpty({ message: 'Los apellidos son requeridos' })
    apellidos: string;

    @IsNotEmpty({ message: 'La identificacion es requerido' })
    identificacion: string;

    @IsEmail({}, { message: 'El email no es valido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    correo: string;

    @IsNotEmpty({ message: 'El telefono es requerido' })
    telefono: string;

    @IsNotEmpty({ message: 'El programa es requerido' })
    programa: Programa;

    @IsOptional()
    foto?: string;

    @IsNotEmpty({ message: 'El rol es requerido' })
    rol: string;
}
