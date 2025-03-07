import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationModule } from 'src/validation/validation.module';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { Categoria } from './entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria]), ValidationModule],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule { }
