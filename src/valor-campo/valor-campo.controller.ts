import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValorCampoService } from './valor-campo.service';
import { CreateValorCampoDto } from './dto/create-valor-campo.dto';
import { UpdateValorCampoDto } from './dto/update-valor-campo.dto';

@Controller('valor-campo')
export class ValorCampoController {
  constructor(private readonly valorCampoService: ValorCampoService) {}

  @Post()
  create(@Body() createValorCampoDto: CreateValorCampoDto) {
    return this.valorCampoService.create(createValorCampoDto);
  }

  @Get()
  findAll() {
    return this.valorCampoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.valorCampoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateValorCampoDto: UpdateValorCampoDto) {
    return this.valorCampoService.update(+id, updateValorCampoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valorCampoService.remove(+id);
  }
}
