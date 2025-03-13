import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActaModule } from './acta/acta.module';
import { AdministradorModule } from './administrador/administrador.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CampoModule } from './campo/campo.module';
import { CategoriaModule } from './categoria/categoria.module';
import { DocenteModule } from './docente/docente.module';
import { FacultadModule } from './facultad/facultad.module';
import { ProgramaModule } from './programa/programa.module';
import { TipoProductoModule } from './tipo-producto/tipo-producto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DB_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    ValidationModule,
    UsuarioModule,
    AdministradorModule,
    TipoProductoModule,
    DocenteModule,
    FacultadModule,
    ProgramaModule,
    ActaModule,
    CategoriaModule,
    CampoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
