import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AdministradorGuard } from './administrador.guard';
import { AdministradorService } from './administrador.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Controller('api/administradores')
export class AdministradorController {
  constructor(private readonly administradorService: AdministradorService) { }

  @Post()
  @UseGuards(AdministradorGuard)
  async create(@Body() createAdministradorDto: CreateAdministradorDto) {
    return await this.administradorService.create(createAdministradorDto);
  }

  @Get()
  async findAll() {
    return await this.administradorService.findAll();
  }

  @Get('cantidad')
  async cantidad() {
    return await this.administradorService.count();
  }

  @Put(':id')
  @UseGuards(AdministradorGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateAdministradorDto: UpdateAdministradorDto) {
    return await this.administradorService.update(id, updateAdministradorDto);
  }

  @Delete(':id')
  @UseGuards(AdministradorGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.administradorService.remove(id);
  }

}
