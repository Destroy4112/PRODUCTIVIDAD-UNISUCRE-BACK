import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidationService } from "src/validation/validation.service";
import { Repository } from "typeorm";
import { CreateCampoDto } from "./dto/create-campo.dto";
import { UpdateCampoDto } from "./dto/update-campo.dto";
import { Campo } from "./entities/campo.entity";

@Injectable()
export class CampoGuard implements CanActivate {

    constructor(
        @InjectRepository(Campo) private readonly repository: Repository<Campo>,
        private readonly validationService: ValidationService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        const { name, tipoProducto, categoria } = body || {};
        const { id } = params || {};

        if (method === 'POST') {
            await this.validationService.validateDto(CreateCampoDto, body);
            return await this.validateUniqueCampo(name, tipoProducto, categoria);
        }

        if (method === 'PUT') {
            await this.validationService.validateDto(UpdateCampoDto, body);
            return await this.validateUniqueCampo(name, tipoProducto, categoria, id);
        }

        if (method === 'DELETE') {
            await this.validateDeleteCampo(id);
        }

        return true;
    }

    private async validateUniqueCampo(name: string, tipoProducto?: number, categoria?: number, excludeId?: number) {
        const query = this.repository.createQueryBuilder('campo')
            .where('campo.name = :name', { name });

        if (tipoProducto) {
            query.andWhere('campo.tipoProducto = :tipoProducto', { tipoProducto });
        } else if (categoria) {
            query.andWhere('campo.categoria = :categoria', { categoria });
        } else {
            query.andWhere('campo.tipoProducto IS NULL AND campo.categoria IS NULL');
        }

        if (excludeId) {
            query.andWhere('campo.id != :id', { id: excludeId });
        }

        const exist = await query.getOne();

        if (exist) {
            throw new HttpException(
                { status: false, errors: ['Ya existe un campo con este nombre para el tipo o categoría especificada'] },
                HttpStatus.OK
            );
        }

        return true;
    }


    private async validateDeleteCampo(id: number) {
        const campo = await this.repository.findOne({ where: { id }, relations: ['valoresCampos'] });

        if (!campo) {
            throw new HttpException(
                { status: false, errors: ['El campo no existe'] },
                HttpStatus.NOT_FOUND
            );
        }

        if (campo.valoresCampos && campo.valoresCampos.length > 0) {
            throw new HttpException(
                { status: false, errors: ['No se puede eliminar el campo porque tiene valores asociados'] },
                HttpStatus.OK
            );
        }
    }
}
