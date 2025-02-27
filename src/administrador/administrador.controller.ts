import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { AdministradorGuard } from './administrador.guard';
import { AdministradorService } from './administrador.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Controller('api/administradores')
export class AdministradorController {
  constructor(private readonly administradorService: AdministradorService) { }

  @Post()
  @UseGuards(AdministradorGuard, JwtAuthGuard)
  async create(@Body() createAdministradorDto: CreateAdministradorDto) {
    return await this.administradorService.create(createAdministradorDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.administradorService.findAll();
  }

  @Get('cantidad')
  @UseGuards(JwtAuthGuard)
  async cantidad() {
    return await this.administradorService.count();
  }

  @Put(':id')
  @UseGuards(AdministradorGuard, JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateAdministradorDto: UpdateAdministradorDto) {
    return await this.administradorService.update(id, updateAdministradorDto);
  }

  @Delete(':id')
  @UseGuards(AdministradorGuard, JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.administradorService.remove(id);
  }

}
