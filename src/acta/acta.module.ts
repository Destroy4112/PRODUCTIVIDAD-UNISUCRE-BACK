import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationModule } from 'src/validation/validation.module';
import { ActaController } from './acta.controller';
import { ActaService } from './acta.service';
import { Acta } from './entities/acta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Acta]), ValidationModule],
  controllers: [ActaController],
  providers: [ActaService],
})
export class ActaModule { }
