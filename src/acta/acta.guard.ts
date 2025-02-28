import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidationService } from "src/validation/validation.service";
import { Not, Repository } from "typeorm";
import { CreateActaDto } from "./dto/create-acta.dto";
import { UpdateActaDto } from "./dto/update-acta.dto";
import { Acta } from "./entities/acta.entity";

@Injectable()
export class ActaGuard implements CanActivate {

    constructor(
        @InjectRepository(Acta) private readonly repository: Repository<Acta>,
        private readonly validationService: ValidationService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { numero_acta } = body;
            await this.validationService.validateDto(CreateActaDto, body);
            const exist = await this.repository.findOne({ where: { numero_acta } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe una acta con este número'] },
                    HttpStatus.OK
                );
            }
        } else if (method === 'PUT') {
            const { id } = params;
            const { numero_acta } = body;
            await this.validationService.validateDto(UpdateActaDto, body);
            const exist = await this.repository.findOne({ where: { numero_acta, id: Not(id) } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe una acta con este número'] },
                    HttpStatus.OK
                );
            }
        } else if (method === 'DELETE') {
            const { id } = params;
            const existe = await this.repository.findOne({ where: { id } });
            if (!existe) {
                throw new HttpException(
                    { status: false, errors: ['El acta no existe'] },
                    HttpStatus.NOT_FOUND
                );
            }
        }

        return true;
    }
}