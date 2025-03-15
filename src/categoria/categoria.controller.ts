import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { CategoriaGuard } from './categoria.guard';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('api/categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) { }

  @Post()
  @UseGuards(CategoriaGuard, JwtAuthGuard)
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return await this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  async findAll() {
    return await this.categoriaService.findAll();
  }

  @Get(':id/campos')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriaService.getFields(id);
  }

  @Put(':id')
  @UseGuards(CategoriaGuard, JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return await this.categoriaService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @UseGuards(CategoriaGuard, JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriaService.remove(id);
  }
}
