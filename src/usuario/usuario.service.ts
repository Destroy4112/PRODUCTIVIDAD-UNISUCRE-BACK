import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { EntityManager, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly repository: Repository<Usuario>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto, manager?: EntityManager) {
    const password = await hash(createUsuarioDto.password, 10);
    createUsuarioDto.password = password;
    const repository = manager ? manager.getRepository(Usuario) : this.repository;
    const usuario = repository.create(createUsuarioDto);
    return await repository.save(usuario);
  }

  async findByCorreo(correo: string) {
    return await this.repository.findOne({ where: { correo }, relations: ['administrador', 'docente'] });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto, manager: EntityManager) {
    return await manager.update(Usuario, id, updateUsuarioDto);
  }

  async remove(id: number, manager: EntityManager) {
    return await manager.delete(Usuario, id)
  }
}
