import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValorCampoModule } from 'src/valor-campo/valor-campo.module';
import { Solicitud } from './entities/solicitud.entity';
import { SolicitudController } from './solicitud.controller';
import { SolicitudService } from './solicitud.service';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitud]), ValorCampoModule],
  controllers: [SolicitudController],
  providers: [SolicitudService],
})
export class SolicitudModule { }
