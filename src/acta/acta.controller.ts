import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { ActaGuard } from './acta.guard';
import { ActaService } from './acta.service';
import { CreateActaDto } from './dto/create-acta.dto';
import { UpdateActaDto } from './dto/update-acta.dto';

@Controller('api/actas')
export class ActaController {
  constructor(private readonly actaService: ActaService) { }

  @Post()
  @UseGuards(ActaGuard, JwtAuthGuard)
  async create(@Body() createActaDto: CreateActaDto) {
    return await this.actaService.create(createActaDto);
  }

  @Get()
  async findAll() {
    return await this.actaService.findAll();
  }

  @Get('cantidad')
  async count() {
    return await this.actaService.count();
  }

  @Put(':id')
  @UseGuards(ActaGuard, JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateActaDto: UpdateActaDto) {
    return await this.actaService.update(id, updateActaDto);
  }

  @Delete(':id')
  @UseGuards(ActaGuard, JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.actaService.remove(id);
  }
}
