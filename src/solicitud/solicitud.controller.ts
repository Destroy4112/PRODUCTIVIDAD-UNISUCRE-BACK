import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { SolicitudService } from './solicitud.service';

@Controller('api/solicitudes')
export class SolicitudController {
  constructor(private readonly solicitudService: SolicitudService) { }

  @Post()
  async create(@Body() createSolicitudDto: CreateSolicitudDto) {
    return await this.solicitudService.create(createSolicitudDto);
  }

  @Get()
  findAll() {
    return this.solicitudService.findAll();
  }

  @Get('docente/:id')
  async getSolicitudesDocente(@Param('id') id: number) {
    return await this.solicitudService.findByDocente(id);
  }
  
  @Get('categoria/:id')
  async getSolicitudesCategoria(@Param('id') id: number) {
    return await this.solicitudService.findByCategoria(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudDto: UpdateSolicitudDto) {
    return this.solicitudService.update(+id, updateSolicitudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudService.remove(+id);
  }
}
