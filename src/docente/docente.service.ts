import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { DataSource, Repository } from 'typeorm';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Docente } from './entities/docente.entity';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente) private readonly repository: Repository<Docente>,
    private readonly usuarioService: UsuarioService,
    private readonly dataSource: DataSource
  ) { }

  async create(createDocenteDto: CreateDocenteDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const usuario = await this.usuarioService.create({
        correo: createDocenteDto.correo, rol: createDocenteDto.rol, password: createDocenteDto.identificacion
      }, queryRunner.manager);

      const admin = await queryRunner.manager.save(this.repository.create({
        ...createDocenteDto,
        usuario,
      }));

      await queryRunner.commitTransaction();

      return {
        status: true,
        message: 'Docente creado correctamente',
        data: admin,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return await this.repository.find({ relations: ['usuario', 'programa'] });
  }

  async count() {
    return await this.repository.count();
  }

  async update(id: number, updateDocenteDto: UpdateDocenteDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const Docente = await this.repository.findOne({ where: { id }, relations: ['usuario'] });
      if (Docente.usuario.correo !== updateDocenteDto.correo) {
        await this.usuarioService.update(Docente.usuario.id, {
          correo: updateDocenteDto.correo
        }, queryRunner.manager);
      }
      Object.assign(Docente, updateDocenteDto);
      await queryRunner.manager.save(Docente);
      await queryRunner.commitTransaction();

      return {
        status: true,
        message: 'Docente actualizado correctamente',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const admin = await this.repository.findOne({ where: { id }, relations: ['usuario'], });
      await this.usuarioService.remove(admin.usuario.id, queryRunner.manager);
      await queryRunner.manager.delete(Docente, id);
      await queryRunner.commitTransaction();

      return {
        status: true,
        message: 'Docente eliminado correctamente',
        data: admin,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
