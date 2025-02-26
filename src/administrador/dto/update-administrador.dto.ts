import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional } from 'class-validator';
import { CreateAdministradorDto } from './create-administrador.dto';

export class UpdateAdministradorDto extends PartialType(CreateAdministradorDto) {

    @IsOptional()
    nombres?: string;

    @IsOptional()
    apellidos?: string;

    @IsOptional()
    identificacion?: string;

    @IsEmail({}, { message: 'El email no es valido' })
    @IsOptional()
    correo?: string;

    @IsOptional()
    telefono?: string;

    @IsOptional()
    sexo?: string;

    @IsOptional()
    foto?: string;

    @IsOptional()
    rol?: string;
}
