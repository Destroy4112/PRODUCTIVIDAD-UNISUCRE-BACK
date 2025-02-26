import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ValidationModule } from 'src/validation/validation.module';
import { AdministradorController } from './administrador.controller';
import { AdministradorService } from './administrador.service';
import { Administrador } from './entities/administrador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrador]), UsuarioModule, ValidationModule],
  controllers: [AdministradorController],
  providers: [AdministradorService],
  exports: [AdministradorService]
})
export class AdministradorModule { }
