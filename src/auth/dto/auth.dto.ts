import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto {

    @IsEmail({}, { message: 'El correo no es válido' })
    @IsNotEmpty({ message: 'El correo es requerido' })
    correo: string;

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    password: string;
}
