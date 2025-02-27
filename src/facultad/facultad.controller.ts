import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { CreateFacultadDto } from './dto/create-facultad.dto';
import { UpdateFacultadDto } from './dto/update-facultad.dto';
import { FacultadGuard } from './facultad.guard';
import { FacultadService } from './facultad.service';

@Controller('api/facultades')
export class FacultadController {
  constructor(private readonly facultadService: FacultadService) { }

  @Post()
  @UseGuards(FacultadGuard, JwtAuthGuard)
  async create(@Body() createFacultadDto: CreateFacultadDto) {
    return await this.facultadService.create(createFacultadDto);
  }

  @Get()
  async findAll() {
    return await this.facultadService.findAll();
  }

  @Put(':id')
  @UseGuards(FacultadGuard, JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateFacultadDto: UpdateFacultadDto) {
    return await this.facultadService.update(id, updateFacultadDto);
  }

  @Delete(':id')
  @UseGuards(FacultadGuard, JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.facultadService.remove(id);
  }
}
