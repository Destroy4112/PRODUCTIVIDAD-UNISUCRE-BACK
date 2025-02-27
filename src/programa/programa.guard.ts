import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidationService } from "src/validation/validation.service";
import { Not, Repository } from "typeorm";
import { CreateProgramaDto } from "./dto/create-programa.dto";
import { UpdateProgramaDto } from "./dto/update-programa.dto";
import { Programa } from "./entities/programa.entity";

@Injectable()
export class ProgramaGuard implements CanActivate {

    constructor(
        @InjectRepository(Programa) private readonly repository: Repository<Programa>,
        private readonly validationService: ValidationService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { nombre } = body;
            await this.validationService.validateDto(CreateProgramaDto, body);
            const exist = await this.repository.findOne({ where: { nombre } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un programa con esta nombre'] },
                    HttpStatus.OK
                );
            }
        } else if (method === 'PUT') {
            const { id } = params;
            const { nombre } = body;
            await this.validationService.validateDto(UpdateProgramaDto, body);
            const exist = await this.repository.findOne({ where: { nombre, id: Not(id) } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un programa con esta nombre'] },
                    HttpStatus.OK
                );
            }
        } else if (method === 'DELETE') {
            const { id } = params;
            const existe = await this.repository.findOne({ where: { id } });
            if (!existe) {
                throw new HttpException(
                    { status: false, errors: ['El programa no existe'] },
                    HttpStatus.NOT_FOUND
                );
            }
        }

        return true;
    }
}