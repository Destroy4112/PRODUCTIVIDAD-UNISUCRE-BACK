import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { CreateTipoProductoDto } from './dto/create-tipo-producto.dto';
import { UpdateTipoProductoDto } from './dto/update-tipo-producto.dto';
import { TipoProductoGuard } from './tipo-producto.guard';
import { TipoProductoService } from './tipo-producto.service';

@Controller('api/tipos-producto')
export class TipoProductoController {
  constructor(private readonly tipoProductoService: TipoProductoService) { }

  @Post()
  @UseGuards(TipoProductoGuard, JwtAuthGuard)
  async create(@Body() createTipoProductoDto: CreateTipoProductoDto) {
    return await this.tipoProductoService.create(createTipoProductoDto);
  }

  @Get()
  async findAll() {
    return await this.tipoProductoService.findAll();
  }

  @Put(':id')
  @UseGuards(TipoProductoGuard, JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTipoProductoDto: UpdateTipoProductoDto) {
    return await this.tipoProductoService.update(id, updateTipoProductoDto);
  }

  @Delete(':id')
  @UseGuards(TipoProductoGuard, JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.tipoProductoService.remove(id);
  }
}
