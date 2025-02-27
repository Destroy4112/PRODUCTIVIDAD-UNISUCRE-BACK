import { Injectable } from '@nestjs/common';
import { CreateFacultadDto } from './dto/create-facultad.dto';
import { UpdateFacultadDto } from './dto/update-facultad.dto';

@Injectable()
export class FacultadService {
  create(createFacultadDto: CreateFacultadDto) {
    return 'This action adds a new facultad';
  }

  findAll() {
    return `This action returns all facultad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facultad`;
  }

  update(id: number, updateFacultadDto: UpdateFacultadDto) {
    return `This action updates a #${id} facultad`;
  }

  remove(id: number) {
    return `This action removes a #${id} facultad`;
  }
}
