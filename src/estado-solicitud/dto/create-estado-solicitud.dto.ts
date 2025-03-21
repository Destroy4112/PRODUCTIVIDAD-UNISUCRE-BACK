import { IsNotEmpty } from "class-validator";
import { Solicitud } from "src/solicitud/entities/solicitud.entity";

export class CreateEstadoSolicitudDto {

    @IsNotEmpty({ message: 'La solicitud es requerida' })
    solicitud: Solicitud;

    @IsNotEmpty({ message: 'El estado es requerido' })
    estado: string;
}
