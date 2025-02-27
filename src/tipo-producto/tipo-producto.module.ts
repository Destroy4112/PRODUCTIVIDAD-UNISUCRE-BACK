import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationModule } from 'src/validation/validation.module';
import { TipoProducto } from './entities/tipo-producto.entity';
import { TipoProductoController } from './tipo-producto.controller';
import { TipoProductoService } from './tipo-producto.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoProducto]), ValidationModule],
  controllers: [TipoProductoController],
  providers: [TipoProductoService],
})
export class TipoProductoModule { }
