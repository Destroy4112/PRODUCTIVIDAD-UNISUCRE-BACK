import { IsNotEmpty, IsOptional } from "class-validator";
import { Campo } from "src/campo/entities/campo.entity";
import { Solicitud } from "src/solicitud/entities/solicitud.entity";

export class CreateValorCampoDto {

    @IsNotEmpty({ message: 'La solicitud es requerido' })
    solicitud: Solicitud;

    @IsNotEmpty({ message: 'El campo es requerido' })
    campo: Campo;

    @IsOptional()
    valor: string;

    @IsOptional()
    archivo: string;

}
