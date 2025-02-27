import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional } from 'class-validator';
import { Programa } from 'src/programa/entities/programa.entity';
import { CreateDocenteDto } from './create-docente.dto';

export class UpdateDocenteDto extends PartialType(CreateDocenteDto) {

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
    programa?: Programa;

    @IsOptional()
    foto?: string;

    @IsOptional()
    rol?: string;
}
