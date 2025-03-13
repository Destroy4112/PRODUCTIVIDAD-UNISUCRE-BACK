import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationModule } from 'src/validation/validation.module';
import { CampoController } from './campo.controller';
import { CampoService } from './campo.service';
import { Campo } from './entities/campo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campo]), ValidationModule],
  controllers: [CampoController],
  providers: [CampoService],
})
export class CampoModule { }
