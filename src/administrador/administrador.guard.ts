import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ValidationService } from 'src/validation/validation.service';
import { Not, Repository } from 'typeorm';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { Administrador } from './entities/administrador.entity';

@Injectable()
export class AdministradorGuard implements CanActivate {
    constructor(
        @InjectRepository(Administrador) private readonly repository: Repository<Administrador>,
        private readonly validationService: ValidationService,
        private readonly usuarioService: UsuarioService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { identificacion, correo } = body;
            await this.validationService.validateDto(CreateAdministradorDto, body);

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
            await this.validationService.validateDto(UpdateAdministradorDto, body);

            const administradoreExist = await this.repository.findOne({ where: { id }, relations: ['usuario'] });
            if (!administradoreExist) {
                throw new HttpException(
                    { status: false, errors: 'Usuario no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }
            const errors: string[] = [];
            const correoExist = await this.usuarioService.findByCorreo(correo);
            const userExist = await this.repository.findOne({ where: { identificacion, id: Not(id) } });
            if (correoExist && correoExist.id !== administradoreExist.usuario.id) errors.push('Ya existe un usuario con este email.');
            if (userExist) errors.push('Ya existe un usuario con esta identificación.');

            if (errors.length > 0) {
                throw new HttpException(
                    { status: false, errors },
                    HttpStatus.OK,
                );
            }

        } else if (method === 'DELETE') {

            const { id } = params;

            const Administradore = await this.repository.findOne({ where: { id } });
            if (!Administradore) {
                throw new HttpException(
                    { status: false, errors: 'Administrador no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }
        }
        return true;
    }
}
