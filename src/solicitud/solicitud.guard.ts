import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidationService } from "src/validation/validation.service";
import { Repository } from "typeorm";
import { CreateSolicitudDto } from "./dto/create-solicitud.dto";
import { UpdateSolicitudDto } from "./dto/update-solicitud.dto";
import { Solicitud } from "./entities/solicitud.entity";

@Injectable()
export class SolicitudGuard implements CanActivate {

    constructor(
        @InjectRepository(Solicitud) private readonly repository: Repository<Solicitud>,
        private readonly validationService: ValidationService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            await this.validationService.validateDto(CreateSolicitudDto, body);
        } else if (method === 'PUT') {
            const { id } = params;
            await this.validationService.validateDto(UpdateSolicitudDto, body);
            const exist = await this.repository.findOne({ where: { id } });
            if (!exist) {
                throw new HttpException(
                    { status: false, errors: ['La solicitud no existe'] },
                    HttpStatus.NOT_FOUND
                );
            }
        }

        return true;
    }
}