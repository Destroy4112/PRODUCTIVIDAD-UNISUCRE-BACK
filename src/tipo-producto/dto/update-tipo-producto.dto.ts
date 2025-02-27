import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateTipoProductoDto } from './create-tipo-producto.dto';

export class UpdateTipoProductoDto extends PartialType(CreateTipoProductoDto) {

    @IsOptional()
    nombre?: string;

    @IsOptional()
    tipo?: string;

    @IsOptional()
    puntos?: number;
}
