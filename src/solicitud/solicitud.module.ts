import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoSolicitudModule } from 'src/estado-solicitud/estado-solicitud.module';
import { ValidationModule } from 'src/validation/validation.module';
import { ValorCampoModule } from 'src/valor-campo/valor-campo.module';
import { Solicitud } from './entities/solicitud.entity';
import { SolicitudController } from './solicitud.controller';
import { SolicitudService } from './solicitud.service';
import { CategoriaModule } from 'src/categoria/categoria.module';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitud]), ValorCampoModule, EstadoSolicitudModule,CategoriaModule, ValidationModule],
  controllers: [SolicitudController],
  providers: [SolicitudService],
})
export class SolicitudModule { }
