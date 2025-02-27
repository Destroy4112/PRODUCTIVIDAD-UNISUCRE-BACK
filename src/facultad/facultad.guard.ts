import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidationService } from "src/validation/validation.service";
import { Not, Repository } from "typeorm";
import { CreateFacultadDto } from "./dto/create-facultad.dto";
import { UpdateFacultadDto } from "./dto/update-facultad.dto";
import { Facultad } from "./entities/facultad.entity";

@Injectable()
export class FacultadGuard implements CanActivate {

    constructor(
        @InjectRepository(Facultad) private readonly repository: Repository<Facultad>,
        private readonly validationService: ValidationService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { nombre } = body;
            await this.validationService.validateDto(CreateFacultadDto, body);
            const exist = await this.repository.findOne({ where: { nombre } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe una facultad con esta nombre'] },
                    HttpStatus.OK
                );
            }
        } else if (method === 'PUT') {
            const { id } = params;
            const { nombre } = body;
            await this.validationService.validateDto(UpdateFacultadDto, body);
            const exist = await this.repository.findOne({ where: { nombre, id: Not(id) } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe una facultad con esta nombre'] },
                    HttpStatus.OK
                );
            }
        } else if (method === 'DELETE') {
            const { id } = params;
            const existe = await this.repository.findOne({ where: { id } });
            if (!existe) {
                throw new HttpException(
                    { status: false, errors: ['La facultad no existe'] },
                    HttpStatus.NOT_FOUND
                );
            }
        }

        return true;
    }
}