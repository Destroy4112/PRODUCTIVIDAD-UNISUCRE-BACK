import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { CampoGuard } from './campo.guard';
import { CampoService } from './campo.service';
import { CreateCampoDto } from './dto/create-campo.dto';
import { UpdateCampoDto } from './dto/update-campo.dto';

@Controller('api/campos')
export class CampoController {
  constructor(private readonly campoService: CampoService) { }

  @Post()
  @UseGuards(CampoGuard, JwtAuthGuard)
  async create(@Body() createCampoDto: CreateCampoDto) {
    return await this.campoService.create(createCampoDto);
  }

  @Get('tipo/:id')
  async findByTipo(@Param('id', ParseIntPipe) id: number) {
    return await this.campoService.findByTipo(id);
  }
  
  @Get('categoria/:id')
  async findByCategoria(@Param('id', ParseIntPipe) id: number) {
    return await this.campoService.findByCategoria(id);
  }

  @Put(':id')
  @UseGuards(CampoGuard, JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCampoDto: UpdateCampoDto) {
    return await this.campoService.update(id, updateCampoDto);
  }

  @Delete(':id')
  @UseGuards(CampoGuard, JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.campoService.remove(id);
  }
}
