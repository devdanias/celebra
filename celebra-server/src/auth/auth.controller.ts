import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    const login = await this.authService.signIn(
      signInDto.email,
      signInDto.senha,
    );

    if (!login) throw new NotFoundException();

    return login;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Public()
  @Post('/cadastrar')
  signUp(@Body() signUpDto: CreateUsuarioDto) {
    return this.authService.signUp(
      signUpDto.nome,
      signUpDto.email,
      signUpDto.senha,
    );
  }
}
