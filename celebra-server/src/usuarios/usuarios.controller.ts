import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
// import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  /**
  criacao de conta movido pra auth/cadastrar 
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }
  */

  @Get()
  async findAll() {
    return { usuarios: await this.usuariosService.findAll() };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usuariosService.findOne(+id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usuariosService.remove(+id);
    if (!user) throw new NotFoundException();
    return user;
  }
}
