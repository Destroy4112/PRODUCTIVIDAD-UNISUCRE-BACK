import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationModule } from 'src/validation/validation.module';
import { Programa } from './entities/programa.entity';
import { ProgramaController } from './programa.controller';
import { ProgramaService } from './programa.service';

@Module({
  imports: [TypeOrmModule.forFeature([Programa]), ValidationModule],
  controllers: [ProgramaController],
  providers: [ProgramaService],
})
export class ProgramaModule { }
