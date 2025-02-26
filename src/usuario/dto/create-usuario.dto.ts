import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUsuarioDto {

    @IsEmail({}, { message: 'El correo no es válido' })
    @IsNotEmpty({ message: 'El correo es requerido' })
    correo: string;

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    password: string;

    @IsNotEmpty({ message: 'El rol es requerido' })
    rol: string;
}
