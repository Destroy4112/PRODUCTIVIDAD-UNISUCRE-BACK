import { Module } from '@nestjs/common';
import { EscalafonDocenteService } from './escalafon-docente.service';
import { EscalafonDocenteController } from './escalafon-docente.controller';

@Module({
  controllers: [EscalafonDocenteController],
  providers: [EscalafonDocenteService],
})
export class EscalafonDocenteModule {}
