import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { fileUploadOptions } from 'src/helpers/file-upload.helper';
import { ValidationService } from 'src/validation/validation.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { SolicitudGuard } from './solicitud.guard';
import { SolicitudService } from './solicitud.service';

@Controller('api/solicitudes')
@UseGuards(JwtAuthGuard)
export class SolicitudController {
  constructor(
    private readonly solicitudService: SolicitudService,
    private readonly validationService: ValidationService
  ) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor(fileUploadOptions('/archivos')))
  async create(@Body() createSolicitudDto: CreateSolicitudDto, @UploadedFiles() files: Express.Multer.File[]) {
    if (typeof createSolicitudDto.valoresCampos === 'string') {
      createSolicitudDto.valoresCampos = JSON.parse(createSolicitudDto.valoresCampos);
    }
    await this.validationService.validateDto(CreateSolicitudDto, createSolicitudDto);
    return await this.solicitudService.create(createSolicitudDto, files);
  }

  @Get('docente/:id')
  async getSolicitudesDocente(@Param('id', ParseIntPipe) id: number) {
    return await this.solicitudService.findByDocente(id);
  }

  @Get('categoria/:id')
  async getSolicitudesCategoria(@Param('id', ParseIntPipe) id: number) {
    return await this.solicitudService.findByCategoria(id);
  }

  @Put(':id')
  @UseGuards(SolicitudGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSolicitudDto: UpdateSolicitudDto) {
    return await this.solicitudService.update(id, updateSolicitudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudService.remove(+id);
  }
}
