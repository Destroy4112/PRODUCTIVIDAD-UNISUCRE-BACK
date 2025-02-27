import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ValidationModule } from 'src/validation/validation.module';
import { DocenteController } from './docente.controller';
import { DocenteService } from './docente.service';
import { Docente } from './entities/docente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Docente]), UsuarioModule, ValidationModule],
  controllers: [DocenteController],
  providers: [DocenteService],
})
export class DocenteModule { }
