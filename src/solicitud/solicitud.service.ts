import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValorCampoService } from 'src/valor-campo/valor-campo.service';
import { DataSource, Repository } from 'typeorm';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { Solicitud } from './entities/solicitud.entity';

@Injectable()
export class SolicitudService {

  constructor(
    @InjectRepository(Solicitud) private solicitudRepository: Repository<Solicitud>,
    private readonly valorCampoService: ValorCampoService,
    private readonly dataSource: DataSource
  ) { }

  async create(createSolicitudDto: CreateSolicitudDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const solicitud = await queryRunner.manager.save(this.solicitudRepository.create({
        categoria: createSolicitudDto.categoria, docente: createSolicitudDto.docente,
        tipoProducto: createSolicitudDto.tipoProducto, fecha: new Date().toISOString(),
      }));

      for (const valorCampo of createSolicitudDto.valoresCampos) {
        await this.valorCampoService.create({
          solicitud, campo: valorCampo.campo, valor: valorCampo.valor
        }, queryRunner.manager);
      }
      await queryRunner.commitTransaction();

      return { status: true, message: 'Solicitud creada correctamente' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all solicitud`;
  }

  async findByDocente(docenteId: number) {
    return await this.solicitudRepository.find({
      where: { docente: { id: docenteId } },
      relations: ['categoria', 'tipoProducto', 'valoresCampos.campo'],
      order: { fecha: 'DESC' },
    });
  }

  async findByCategoria(id: number) {
    return await this.solicitudRepository.find({
      where: { categoria: { id } },
      relations: ['categoria', 'tipoProducto', 'valoresCampos'],
      order: { fecha: 'DESC' },
    });
  }

  update(id: number, updateSolicitudDto: UpdateSolicitudDto) {
    return `This action updates a #${id} solicitud`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitud`;
  }
}
