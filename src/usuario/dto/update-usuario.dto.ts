import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional } from 'class-validator';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    @IsEmail({}, { message: 'El correo no es válido' })
    @IsOptional()
    correo?: string;

    @IsOptional()
    password?: string;

    @IsOptional()
    rol?: string;
}
