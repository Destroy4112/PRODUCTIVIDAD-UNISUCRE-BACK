import { Injectable } from '@nestjs/common';
import { CreateEscalafonDocenteDto } from './dto/create-escalafon-docente.dto';
import { UpdateEscalafonDocenteDto } from './dto/update-escalafon-docente.dto';

@Injectable()
export class EscalafonDocenteService {
  create(createEscalafonDocenteDto: CreateEscalafonDocenteDto) {
    return 'This action adds a new escalafonDocente';
  }

  findAll() {
    return `This action returns all escalafonDocente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} escalafonDocente`;
  }

  update(id: number, updateEscalafonDocenteDto: UpdateEscalafonDocenteDto) {
    return `This action updates a #${id} escalafonDocente`;
  }

  remove(id: number) {
    return `This action removes a #${id} escalafonDocente`;
  }
}
