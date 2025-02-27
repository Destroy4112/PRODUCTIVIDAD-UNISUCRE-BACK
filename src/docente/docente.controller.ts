import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { DocenteGuard } from './docente.guard';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@Controller('api/docentes')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) { }

  @Post()
  @UseGuards(DocenteGuard, JwtAuthGuard)
  async create(@Body() createDocenteDto: CreateDocenteDto) {
    return await this.docenteService.create(createDocenteDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.docenteService.findAll();
  }

  @Get('cantidad')
  @UseGuards(JwtAuthGuard)
  async cantidad() {
    return await this.docenteService.count();
  }

  @Put(':id')
  @UseGuards(DocenteGuard, JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDocenteDto: UpdateDocenteDto) {
    return await this.docenteService.update(id, updateDocenteDto);
  }

  @Delete(':id')
  @UseGuards(DocenteGuard, JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.docenteService.remove(id);
  }
}
