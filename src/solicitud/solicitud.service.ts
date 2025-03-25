import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaService } from 'src/categoria/categoria.service';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Docente } from 'src/docente/entities/docente.entity';
import { EstadoSolicitud } from 'src/estado-solicitud/entities/estado-solicitud.entity';
import { EstadoSolicitudService } from 'src/estado-solicitud/estado-solicitud.service';
import { TipoProducto } from 'src/tipo-producto/entities/tipo-producto.entity';
import { ValorCampoService } from 'src/valor-campo/valor-campo.service';
import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { Solicitud } from './entities/solicitud.entity';

@Injectable()
export class SolicitudService {

  constructor(
    @InjectRepository(Solicitud) private solicitudRepository: Repository<Solicitud>,
    private readonly estadoSolicitudService: EstadoSolicitudService,
    private readonly valorCampoService: ValorCampoService,
    private readonly categoriaService: CategoriaService,
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

  async findByDocente(id: number) {
    return await this.solicitudRepository.find({
      where: { docente: { id } },
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

  async countPointsByCategory(id: number) {
    const solicitudes = await this.solicitudRepository.find({
      where: { docente: { id }, estado: "Aprobado" },
      relations: ['categoria'],
    });

    const allCategories = await this.categoriaService.findAll();

    const puntosPorCategoria = solicitudes.reduce((acc, solicitud) => {
      const categoriaId = solicitud.categoria.id;
      if (!acc[categoriaId]) {
        acc[categoriaId] = {
          categoria: categoriaId,
          categoriaNombre: solicitud.categoria.nombre,
          totalPuntos: 0
        };
      }
      acc[categoriaId].totalPuntos += solicitud.puntos || 0;
      return acc;
    }, {} as Record<number, { categoria: number; categoriaNombre: string; totalPuntos: number }>);

    return allCategories.map(categoria => ({
      categoria: categoria.nombre,
      puntos: puntosPorCategoria[categoria.id]?.totalPuntos || 0
    }));
  }

  async countPointsPendientes(id: number) {
    let puntosPendientes = 0;

    const solicitudes = await this.solicitudRepository.find({
      where: { docente: { id }, puntos: IsNull() }, relations: ['tipoProducto'],
    });

    for (const solicitud of solicitudes) {
      puntosPendientes += solicitud.tipoProducto.puntos;
    }

    return puntosPendientes;
  }

  async update(id: number, updateSolicitudDto: UpdateSolicitudDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const solicitud = await queryRunner.manager.findOne(Solicitud, { where: { id } });
      solicitud.acta = updateSolicitudDto.acta ?? solicitud.acta;
      solicitud.puntos = updateSolicitudDto.puntos ?? solicitud.puntos;
      solicitud.observacion = updateSolicitudDto.observacion ?? solicitud.observacion;

      if (updateSolicitudDto.estado !== solicitud.estado) {
        await queryRunner.manager.delete(EstadoSolicitud, { solicitud: { id }, estado: Not('Enviado') });
        solicitud.estado = updateSolicitudDto.estado;
        await this.estadoSolicitudService.create({ estado: updateSolicitudDto.estado, solicitud }, queryRunner.manager);
      }
      await queryRunner.manager.save(solicitud);
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
