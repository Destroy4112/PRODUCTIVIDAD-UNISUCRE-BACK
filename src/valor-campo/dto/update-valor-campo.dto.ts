import { PartialType } from '@nestjs/mapped-types';
import { CreateValorCampoDto } from './create-valor-campo.dto';

export class UpdateValorCampoDto extends PartialType(CreateValorCampoDto) {}
