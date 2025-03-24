import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateValorCampoDto } from './dto/create-valor-campo.dto';
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

}
