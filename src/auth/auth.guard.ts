import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ValidationService } from 'src/validation/validation.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly validationService: ValidationService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { body } = request;
        const { correo, password } = body;

        await this.validationService.validateDto(AuthDto, body);
        const user = await this.usuarioService.findByCorreo(correo);
        if (!user) {
            throw new HttpException(
                { status: false, errors: ['El usuario no existe'] }, HttpStatus.OK,
            )
        }
        const checkPassword = await compare(password, user.password);
        if (!checkPassword) {
            throw new HttpException(
                { status: false, errors: ['La contraseña es incorrecta'] }, HttpStatus.OK
            )
        }

        return true;
    }
}
