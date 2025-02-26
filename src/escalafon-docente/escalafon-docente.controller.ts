import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EscalafonDocenteService } from './escalafon-docente.service';
import { CreateEscalafonDocenteDto } from './dto/create-escalafon-docente.dto';
import { UpdateEscalafonDocenteDto } from './dto/update-escalafon-docente.dto';

@Controller('escalafon-docente')
export class EscalafonDocenteController {
  constructor(private readonly escalafonDocenteService: EscalafonDocenteService) {}

  @Post()
  create(@Body() createEscalafonDocenteDto: CreateEscalafonDocenteDto) {
    return this.escalafonDocenteService.create(createEscalafonDocenteDto);
  }

  @Get()
  findAll() {
    return this.escalafonDocenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.escalafonDocenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEscalafonDocenteDto: UpdateEscalafonDocenteDto) {
    return this.escalafonDocenteService.update(+id, updateEscalafonDocenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.escalafonDocenteService.remove(+id);
  }
}
