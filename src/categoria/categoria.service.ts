import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(@InjectRepository(Categoria) private readonly repository: Repository<Categoria>) { }

  async create(createCategoriaDto: CreateCategoriaDto) {
    const data = await this.repository.save(this.repository.create(createCategoriaDto));
    return { status: true, message: 'Categoria creado correctamente', data };
  }

  async findAll() {
    return await this.repository.find({ relations: ['tiposProductos'] })
      .then(result => result.map(item => ({ ...item, tiposProductos: item.tiposProductos.length })));
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    await this.repository.update(id, updateCategoriaDto);
    return { status: true, message: 'Categoria actualizado correctamente' };
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return { status: true, message: 'Categoria eliminado correctamente' };
  }
}
