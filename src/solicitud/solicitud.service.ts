import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Docente } from 'src/docente/entities/docente.entity';
import { EstadoSolicitudService } from 'src/estado-solicitud/estado-solicitud.service';
import { TipoProducto } from 'src/tipo-producto/entities/tipo-producto.entity';
import { ValorCampoService } from 'src/valor-campo/valor-campo.service';
import { DataSource, Repository } from 'typeorm';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { Solicitud } from './entities/solicitud.entity';

@Injectable()
export class SolicitudService {

  constructor(
    @InjectRepository(Solicitud) private solicitudRepository: Repository<Solicitud>,
    private readonly estadoSolicitudService: EstadoSolicitudService,
    private readonly valorCampoService: ValorCampoService,
    private readonly dataSource: DataSource
  ) { }

  async create(createSolicitudDto: CreateSolicitudDto, files: Express.Multer.File[]) {
    if (!files || !Array.isArray(files)) files = [];
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const categoria = await queryRunner.manager.findOne(Categoria, { where: { id: createSolicitudDto.categoria } });
      const docente = await queryRunner.manager.findOne(Docente, { where: { id: createSolicitudDto.docente } });
      const tipoProducto = await queryRunner.manager.findOne(TipoProducto, { where: { id: createSolicitudDto.tipoProducto } });

      createSolicitudDto.estado = 'Enviado';
      const solicitud = await queryRunner.manager.save(
        this.solicitudRepository.create({ categoria, docente, tipoProducto, estado: createSolicitudDto.estado })
      );

      for (const valorCampo of createSolicitudDto.valoresCampos) {
        const archivoAsociado = files.find(file => file.fieldname === `files[${valorCampo.campo}]`);

        await this.valorCampoService.create({
          solicitud,
          campo: valorCampo.campo,
          valor: archivoAsociado ? null : valorCampo.valor,
          archivo: archivoAsociado ? `archivos/${archivoAsociado.filename}` : null
        }, queryRunner.manager);
      }


      await this.estadoSolicitudService.create({ estado: 'Enviado', solicitud }, queryRunner.manager);
      await queryRunner.commitTransaction();

      return { status: true, message: 'Solicitud creada correctamente' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findByDocente(docenteId: number) {
    return await this.solicitudRepository.find({
      where: { docente: { id: docenteId } },
      relations: ['categoria', 'tipoProducto', 'estados', 'valoresCampos.campo', 'acta', 'docente'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByCategoria(id: number) {
    return await this.solicitudRepository.find({
      where: { categoria: { id } },
      relations: ['categoria', 'tipoProducto', 'estados', 'valoresCampos.campo', 'acta', 'docente'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, updateSolicitudDto: UpdateSolicitudDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const solicitud = await queryRunner.manager.findOne(Solicitud, { where: { id } });
      solicitud.acta = updateSolicitudDto.acta;
      solicitud.puntos = updateSolicitudDto.puntos;
      solicitud.observacion = updateSolicitudDto.observacion;
      solicitud.estado = updateSolicitudDto.estado;
      await queryRunner.manager.save(solicitud);
      await this.estadoSolicitudService.create({ estado: updateSolicitudDto.estado, solicitud }, queryRunner.manager);
      await queryRunner.commitTransaction();
      return { status: true, message: 'Solicitud actualizada correctamente' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} solicitud`;
  }
}
