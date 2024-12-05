import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { NoivosService } from './noivos.service';
import { CreateNoivoDto } from './dto/create-noivo.dto';
import { UpdateNoivoDto } from './dto/update-noivo.dto';

@Controller('noivos')
export class NoivosController {
  constructor(private readonly noivosService: NoivosService) {}

  @Post()
  create(@Body() createNoivoDto: CreateNoivoDto, @Req() req) {
    return this.noivosService.create(createNoivoDto, req.user.sub);
  }

  @Get()
  async findAll(@Req() req) {
    return { noivos: await this.noivosService.findAll(req.user.sub) };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const noivo = await this.noivosService.findOne(+id, req.user.sub);
    if (!noivo) throw new NotFoundException();
    return noivo;
  }

  // @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoivoDto: UpdateNoivoDto,
    @Req() req,
  ) {
    const noivo = await this.noivosService.update(
      +id,
      updateNoivoDto,
      req.user.sub,
    );
    if (!noivo) throw new NotFoundException();
    return noivo;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const noivo = await this.noivosService.remove(+id);
    if (!noivo) throw new NotFoundException();
    return noivo;
  }
}
