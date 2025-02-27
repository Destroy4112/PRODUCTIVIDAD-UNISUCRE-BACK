import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateFacultadDto } from './create-facultad.dto';

export class UpdateFacultadDto extends PartialType(CreateFacultadDto) {

    @IsOptional()
    nombre?: string;
}
