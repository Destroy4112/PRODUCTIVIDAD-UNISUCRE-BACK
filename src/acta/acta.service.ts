import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActaDto } from './dto/create-acta.dto';
import { UpdateActaDto } from './dto/update-acta.dto';
import { Acta } from './entities/acta.entity';

@Injectable()
export class ActaService {
  constructor(@InjectRepository(Acta) private readonly repository: Repository<Acta>) { }

  async create(createActaDto: CreateActaDto) {
    const data = await this.repository.save(this.repository.create(createActaDto));
    return { status: true, message: 'Acta creada correctamente', data };
  }

  async findAll() {
    return await this.repository.find();
  }

  async update(id: number, updateActaDto: UpdateActaDto) {
    await this.repository.update(id, updateActaDto);
    return { status: true, message: 'Acta actualizada correctamente' };
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return { status: true, message: 'Acta eliminada correctamente' };
  }
}
