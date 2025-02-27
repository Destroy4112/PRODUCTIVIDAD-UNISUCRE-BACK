import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { Programa } from './entities/programa.entity';

@Injectable()
export class ProgramaService {
  constructor(@InjectRepository(Programa) private readonly repository: Repository<Programa>) { }

  async create(createProgramaDto: CreateProgramaDto) {
    const data = await this.repository.save(this.repository.create(createProgramaDto));
    return { status: true, message: 'Programa creada correctamente', data };
  }

  async findAll() {
    return await this.repository.find({ relations: ['facultad'] });
  }

  async findByFacultad(id: number) {
    return await this.repository.find({ where: { facultad: { id } }, relations: ['facultad'] });
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto) {
    await this.repository.update(id, updateProgramaDto);
    return { status: true, message: 'Programa actualizada correctamente' };
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return { status: true, message: 'Programa eliminada correctamente' };
  }

}
