import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { ProgramaGuard } from './programa.guard';
import { ProgramaService } from './programa.service';

@Controller('api/programas')
export class ProgramaController {
  constructor(private readonly programaService: ProgramaService) { }

  @Post()
  @UseGuards(ProgramaGuard, JwtAuthGuard)
  async create(@Body() createProgramaDto: CreateProgramaDto) {
    return await this.programaService.create(createProgramaDto);
  }

  @Get()
  async findAll() {
    return await this.programaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.programaService.findByFacultad(id);
  }

  @Put(':id')
  @UseGuards(ProgramaGuard, JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProgramaDto: UpdateProgramaDto) {
    return await this.programaService.update(id, updateProgramaDto);
  }

  @Delete(':id')
  @UseGuards(ProgramaGuard, JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.programaService.remove(id);
  }
}
