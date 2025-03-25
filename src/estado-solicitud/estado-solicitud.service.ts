import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateEstadoSolicitudDto } from './dto/create-estado-solicitud.dto';
import { EstadoSolicitud } from './entities/estado-solicitud.entity';

@Injectable()
export class EstadoSolicitudService {
  constructor(
    @InjectRepository(EstadoSolicitud) private readonly estadoSolicitudRepository: Repository<EstadoSolicitud>
  ) { }

  async create(createEstadoSolicitudDto: CreateEstadoSolicitudDto, manager?: EntityManager) {
    const repository = manager ? manager.getRepository(EstadoSolicitud) : this.estadoSolicitudRepository;
    return await repository.save(repository.create(createEstadoSolicitudDto));
  }

  async findBySolicitud(id: number) {
    return await this.estadoSolicitudRepository.find({ where: { solicitud: { id } } });
  }
}
