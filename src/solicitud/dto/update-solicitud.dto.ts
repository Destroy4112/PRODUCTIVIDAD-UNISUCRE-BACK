import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Acta } from 'src/acta/entities/acta.entity';
import { CreateSolicitudDto } from './create-solicitud.dto';

export class UpdateSolicitudDto extends PartialType(CreateSolicitudDto) {

    @IsNotEmpty({ message: 'El acta es requerido' })
    acta: Acta;

    @IsOptional()
    puntos: number;

    @IsOptional()
    observacion: string;

    @IsNotEmpty({ message: 'El estado es requerido' })
    estado: string;
}
