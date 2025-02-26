import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() authDto: AuthDto) {
    return await this.authService.login(authDto);
  }

}
