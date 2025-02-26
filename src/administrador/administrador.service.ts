import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { DataSource, Repository } from 'typeorm';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { Administrador } from './entities/administrador.entity';

@Injectable()
export class AdministradorService {
  constructor(
    @InjectRepository(Administrador) private readonly repository: Repository<Administrador>,
    private readonly usuarioService: UsuarioService,
    private readonly dataSource: DataSource
  ) { }

  async create(createAdministradorDto: CreateAdministradorDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const usuario = await this.usuarioService.create({
        correo: createAdministradorDto.correo, rol: createAdministradorDto.rol, password: createAdministradorDto.identificacion
      }, queryRunner.manager);

      const admin = await queryRunner.manager.save(this.repository.create({
        ...createAdministradorDto,
        usuario,
      }));

      await queryRunner.commitTransaction();

      return {
        status: true,
        message: 'Administrador creado correctamente',
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
    return await this.repository.find({ where: { usuario: { rol: 'Administrador' } }, relations: ['usuario'] });
  }

  async count() {
    return await this.repository.count({ where: { usuario: { rol: 'Administrador' } }, relations: ['usuario'] });
  }

  async update(id: number, updateAdministradorDto: UpdateAdministradorDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const administrador = await this.repository.findOne({ where: { id }, relations: ['usuario'] });
      if (administrador.usuario.correo !== updateAdministradorDto.correo) {
        await this.usuarioService.update(administrador.usuario.id, {
          correo: updateAdministradorDto.correo
        }, queryRunner.manager);
      }
      Object.assign(administrador, updateAdministradorDto);
      await queryRunner.manager.save(administrador);
      await queryRunner.commitTransaction();

      return {
        status: true,
        message: 'Administrador actualizado correctamente',
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
      await queryRunner.manager.delete(Administrador, id);
      await queryRunner.commitTransaction();

      return {
        status: true,
        message: 'Administrador eliminado correctamente',
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
