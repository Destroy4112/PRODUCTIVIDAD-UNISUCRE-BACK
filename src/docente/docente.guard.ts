import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ValidationService } from 'src/validation/validation.service';
import { Not, Repository } from 'typeorm';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Docente } from './entities/docente.entity';

@Injectable()
export class DocenteGuard implements CanActivate {
    constructor(
        @InjectRepository(Docente) private readonly repository: Repository<Docente>,
        private readonly validationService: ValidationService,
        private readonly usuarioService: UsuarioService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { identificacion, correo } = body;
            await this.validationService.validateDto(CreateDocenteDto, body);

            const exist = await this.repository.findOne({ where: { identificacion } });
            const userExist = await this.usuarioService.findByCorreo(correo);

            const errors: string[] = [];
            if (exist) errors.push('Ya existe un usuario con esta identificación.');
            if (userExist) errors.push('Ya existe un usuario con este correo.');

            if (errors.length > 0) {
                throw new HttpException(
                    { status: false, errors },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'PUT') {
            const { id } = params;
            const { identificacion, correo } = body;
            await this.validationService.validateDto(UpdateDocenteDto, body);

            const DocenteeExist = await this.repository.findOne({ where: { id }, relations: ['usuario'] });
            if (!DocenteeExist) {
                throw new HttpException(
                    { status: false, errors: 'Usuario no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }
            const errors: string[] = [];
            const correoExist = await this.usuarioService.findByCorreo(correo);
            const userExist = await this.repository.findOne({ where: { identificacion, id: Not(id) } });
            if (correoExist && correoExist.id !== DocenteeExist.usuario.id) errors.push('Ya existe un usuario con este email.');
            if (userExist) errors.push('Ya existe un usuario con esta identificación.');

            if (errors.length > 0) {
                throw new HttpException(
                    { status: false, errors },
                    HttpStatus.OK,
                );
            }

        } else if (method === 'DELETE') {

            const { id } = params;

            const Docentee = await this.repository.findOne({ where: { id } });
            if (!Docentee) {
                throw new HttpException(
                    { status: false, errors: 'Docente no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }
        }
        return true;
    }
}
