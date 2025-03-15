import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateValorCampoDto } from './dto/create-valor-campo.dto';
import { UpdateValorCampoDto } from './dto/update-valor-campo.dto';
import { ValorCampo } from './entities/valor-campo.entity';

@Injectable()
export class ValorCampoService {

  constructor(
    @InjectRepository(ValorCampo) private readonly repository: Repository<ValorCampo>,
  ) { }

  async create(createValorCampoDto: CreateValorCampoDto, manager?: EntityManager) {
    const repository = manager ? manager.getRepository(ValorCampo) : this.repository;
    return await repository.save(repository.create(createValorCampoDto));
  }

  findAll() {
    return `This action returns all valorCampo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} valorCampo`;
  }

  update(id: number, updateValorCampoDto: UpdateValorCampoDto) {
    return `This action updates a #${id} valorCampo`;
  }

  remove(id: number) {
    return `This action removes a #${id} valorCampo`;
  }
}
