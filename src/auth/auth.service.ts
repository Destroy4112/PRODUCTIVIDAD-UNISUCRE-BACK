import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private JwtService: JwtService,
  ) { }

  async login(usuarioLogin: AuthDto) {
    const { correo } = usuarioLogin;
    const user = await this.usuarioService.findByCorreo(correo);
    const payload = { id: user.id, usuario: user.correo };
    const token = this.JwtService.sign(payload);
    const credenciales = { id: user.id, usuario: user.correo, rol: user.rol };
    const usuario = user.administrador;
    return {
      status: true,
      token,
      usuario,
      credenciales,
    };
  }

}
