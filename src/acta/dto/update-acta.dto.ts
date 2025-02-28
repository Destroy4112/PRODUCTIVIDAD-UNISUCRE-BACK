import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateActaDto } from './create-acta.dto';

export class UpdateActaDto extends PartialType(CreateActaDto) {

    @IsOptional()
    numero_acta?: number;

    @IsOptional()
    fecha_acta?: string;
}
