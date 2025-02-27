import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidationService } from "src/validation/validation.service";
import { Not, Repository } from "typeorm";
import { CreateTipoProductoDto } from "./dto/create-tipo-producto.dto";
import { UpdateTipoProductoDto } from "./dto/update-tipo-producto.dto";
import { TipoProducto } from "./entities/tipo-producto.entity";

@Injectable()
export class TipoProductoGuard implements CanActivate {

    constructor(
        @InjectRepository(TipoProducto) private readonly repository: Repository<TipoProducto>,
        private readonly validationService: ValidationService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { nombre, tipo } = body;
            await this.validationService.validateDto(CreateTipoProductoDto, body);
            const exist = await this.repository.findOne({ where: { nombre, tipo } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un tipo con esta nombre'] },
                    HttpStatus.OK
                );
            }
        } else if (method === 'PUT') {
            const { id } = params;
            const { nombre, tipo } = body;
            await this.validationService.validateDto(UpdateTipoProductoDto, body);
            const exist = await this.repository.findOne({ where: { nombre, tipo, id: Not(id) } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un tipo con esta nombre'] },
                    HttpStatus.OK
                );
            }
        } else if (method === 'DELETE') {
            const { id } = params;
            const existe = await this.repository.findOne({ where: { id } });
            if (!existe) {
                throw new HttpException(
                    { status: false, errors: ['El tipo no existe'] },
                    HttpStatus.NOT_FOUND
                );
            }
        }

        return true;
    }
}