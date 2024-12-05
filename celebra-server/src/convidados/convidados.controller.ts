import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { ConvidadosService } from './convidados.service';
import { CreateConvidadoDto } from './dto/create-convidado.dto';
import { UpdateConvidadoDto } from './dto/update-convidado.dto';

@Controller('convidados')
export class ConvidadosController {
  constructor(private readonly convidadosService: ConvidadosService) {}

  @Post()
  create(@Body() createConvidadoDto: CreateConvidadoDto, @Req() req) {
    return this.convidadosService.create(createConvidadoDto, req.user.sub);
  }

  @Get()
  async findAll(@Req() req) {
    return { convidados: await this.convidadosService.findAll(req.user.sub) };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const convidado = await this.convidadosService.findOne(+id, req.user.sub);
    if (!convidado) throw new NotFoundException();
    return convidado;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConvidadoDto: UpdateConvidadoDto,
    @Req() req,
  ) {
    const convidado = await this.convidadosService.update(
      +id,
      updateConvidadoDto,
      req.user.sub,
    );
    if (!convidado) throw new NotFoundException();
    return convidado;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const convidado = await this.convidadosService.remove(+id);
    if (!convidado) throw new NotFoundException();
    return convidado;
  }
}
