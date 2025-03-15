import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValorCampo } from './entities/valor-campo.entity';
import { ValorCampoController } from './valor-campo.controller';
import { ValorCampoService } from './valor-campo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ValorCampo])],
  controllers: [ValorCampoController],
  providers: [ValorCampoService],
  exports: [ValorCampoService]
})
export class ValorCampoModule { }
