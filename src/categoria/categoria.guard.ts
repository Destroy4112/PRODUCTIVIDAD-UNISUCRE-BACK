import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidationService } from "src/validation/validation.service";
import { Not, Repository } from "typeorm";
import { CreateCategoriaDto } from "./dto/create-categoria.dto";
import { UpdateCategoriaDto } from "./dto/update-categoria.dto";
import { Categoria } from "./entities/categoria.entity";

@Injectable()
export class CategoriaGuard implements CanActivate {

    constructor(
        @InjectRepository(Categoria) private readonly repository: Repository<Categoria>,
        private readonly validationService: ValidationService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { nombre } = body;
            await this.validationService.validateDto(CreateCategoriaDto, body);
            const exist = await this.repository.findOne({ where: { nombre } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe una categoría con este nombre'] },
                    HttpStatus.OK
                );
            }
        } else if (method === 'PUT') {
            const { id } = params;
            const { nombre } = body;
            await this.validationService.validateDto(UpdateCategoriaDto, body);
            const exist = await this.repository.findOne({ where: { nombre, id: Not(id) } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe una categoría con este nombre'] },
                    HttpStatus.OK
                );
            }
        } else if (method === 'DELETE') {
            const { id } = params;
            const existe = await this.repository.findOne({ where: { id } });
            if (!existe) {
                throw new HttpException(
                    { status: false, errors: ['La categoría no existe'] },
                    HttpStatus.NOT_FOUND
                );
            }
        }

        return true;
    }
}