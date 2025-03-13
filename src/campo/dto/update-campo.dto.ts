import { PartialType } from '@nestjs/mapped-types';
import { CreateCampoDto } from './create-campo.dto';
import { TipoProducto } from 'src/tipo-producto/entities/tipo-producto.entity';
import { IsOptional } from 'class-validator';
import { Categoria } from 'src/categoria/entities/categoria.entity';

export class UpdateCampoDto extends PartialType(CreateCampoDto) {

    @IsOptional()
    name: string;

    @IsOptional()
    tipo: string;

    @IsOptional()
    tipoProducto: TipoProducto;

    @IsOptional()
    categoria: Categoria;
}
