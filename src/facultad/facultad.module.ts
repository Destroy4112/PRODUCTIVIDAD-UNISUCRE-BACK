import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationModule } from 'src/validation/validation.module';
import { Facultad } from './entities/facultad.entity';
import { FacultadController } from './facultad.controller';
import { FacultadService } from './facultad.service';

@Module({
  imports: [TypeOrmModule.forFeature([Facultad]), ValidationModule],
  controllers: [FacultadController],
  providers: [FacultadService],
})
export class FacultadModule { }
