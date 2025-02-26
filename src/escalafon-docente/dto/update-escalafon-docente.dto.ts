import { PartialType } from '@nestjs/mapped-types';
import { CreateEscalafonDocenteDto } from './create-escalafon-docente.dto';

export class UpdateEscalafonDocenteDto extends PartialType(CreateEscalafonDocenteDto) {}
