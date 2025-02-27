import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacultadDto } from './dto/create-facultad.dto';
import { UpdateFacultadDto } from './dto/update-facultad.dto';
import { Facultad } from './entities/facultad.entity';

@Injectable()
export class FacultadService {
  constructor(@InjectRepository(Facultad) private readonly repository: Repository<Facultad>) { }

  async create(createFacultadDto: CreateFacultadDto) {
    const data = await this.repository.save(this.repository.create(createFacultadDto));
    return { status: true, message: 'Facultad creada correctamente', data };
  }

  async findAll() {
    return await this.repository.find();
  }

  async update(id: number, updateFacultadDto: UpdateFacultadDto) {
    await this.repository.update(id, updateFacultadDto);
    return { status: true, message: 'Facultad actualizada correctamente' };
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return { status: true, message: 'Facultad eliminada correctamente' };
  }
  
}
