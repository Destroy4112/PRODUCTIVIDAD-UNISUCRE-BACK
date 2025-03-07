import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoProductoDto } from './dto/create-tipo-producto.dto';
import { UpdateTipoProductoDto } from './dto/update-tipo-producto.dto';
import { TipoProducto } from './entities/tipo-producto.entity';

@Injectable()
export class TipoProductoService {
  constructor(@InjectRepository(TipoProducto) private readonly repository: Repository<TipoProducto>) { }

  async create(createTipoProductoDto: CreateTipoProductoDto) {
    const data = await this.repository.save(this.repository.create(createTipoProductoDto));
    return { status: true, message: 'Tipo creado correctamente', data };
  }

  async findAll(id: number) {
    return await this.repository.find({ where: { categoria: { id } } });
  }

  async update(id: number, updateTipoProductoDto: UpdateTipoProductoDto) {
    await this.repository.update(id, updateTipoProductoDto);
    return { status: true, message: 'Tipo actualizado correctamente' };
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return { status: true, message: 'Tipo eliminado correctamente' };
  }
}
