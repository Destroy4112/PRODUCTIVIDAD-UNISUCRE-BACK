import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { SolicitudGuard } from './solicitud.guard';
import { SolicitudService } from './solicitud.service';

@Controller('api/solicitudes')
export class SolicitudController {
  constructor(private readonly solicitudService: SolicitudService) { }

  @Post()
  @UseGuards(SolicitudGuard, JwtAuthGuard)
  async create(@Body() createSolicitudDto: CreateSolicitudDto) {
    return await this.solicitudService.create(createSolicitudDto);
  }

  @Get('docente/:id')
  @UseGuards(JwtAuthGuard)
  async getSolicitudesDocente(@Param('id', ParseIntPipe) id: number) {
    return await this.solicitudService.findByDocente(id);
  }

  @Get('categoria/:id')
  @UseGuards(JwtAuthGuard)
  async getSolicitudesCategoria(@Param('id', ParseIntPipe) id: number) {
    return await this.solicitudService.findByCategoria(id);
  }

  @Put(':id')
  @UseGuards(SolicitudGuard, JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSolicitudDto: UpdateSolicitudDto) {
    return await this.solicitudService.update(id, updateSolicitudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudService.remove(+id);
  }
}
