import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCampoDto } from './dto/create-campo.dto';
import { UpdateCampoDto } from './dto/update-campo.dto';
import { Campo } from './entities/campo.entity';

@Injectable()
export class CampoService {
  constructor(@InjectRepository(Campo) private readonly repository: Repository<Campo>) { }

  async create(createCampoDto: CreateCampoDto) {
    const data = await this.repository.save(this.repository.create(createCampoDto));
    return { status: true, message: 'Campo creado correctamente', data };
  }

  async findByTipo(id: number) {
    return await this.repository.find({ where: { tipoProducto: { id } } });
  }

  async findByCategoria(id: number) {
    return await this.repository.find({ where: { categoria: { id } } });
  }

  async update(id: number, updateCampoDto: UpdateCampoDto) {
    await this.repository.update(id, updateCampoDto);
    return { status: true, message: 'Campo actualizado correctamente' };
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return { status: true, message: 'Campo eliminado correctamente' };
  }
}
