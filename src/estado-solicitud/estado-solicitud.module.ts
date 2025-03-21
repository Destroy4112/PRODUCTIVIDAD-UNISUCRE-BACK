import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoSolicitud } from './entities/estado-solicitud.entity';
import { EstadoSolicitudService } from './estado-solicitud.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoSolicitud])],
  providers: [EstadoSolicitudService],
  exports: [EstadoSolicitudService] 
})
export class EstadoSolicitudModule { }
