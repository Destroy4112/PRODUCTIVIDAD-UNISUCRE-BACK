import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { CreateTipoProductoDto } from './create-tipo-producto.dto';

export class UpdateTipoProductoDto extends PartialType(CreateTipoProductoDto) {

    @IsOptional()
    nombre?: string;

    @IsOptional()
    categoria?: Categoria;

    @IsOptional()
    puntos?: number;
}
