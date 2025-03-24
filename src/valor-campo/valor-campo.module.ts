import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValorCampo } from './entities/valor-campo.entity';
import { ValorCampoService } from './valor-campo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ValorCampo])],
  providers: [ValorCampoService],
  exports: [ValorCampoService]
})
export class ValorCampoModule { }
