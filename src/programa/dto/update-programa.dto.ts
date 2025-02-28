import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { Facultad } from 'src/facultad/entities/facultad.entity';
import { CreateProgramaDto } from './create-programa.dto';

export class UpdateProgramaDto extends PartialType(CreateProgramaDto) {

    @IsOptional()
    nombre?: string;

    @IsOptional()
    facultad?: Facultad;
}
