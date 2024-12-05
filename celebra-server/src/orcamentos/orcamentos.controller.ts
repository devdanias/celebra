import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { OrcamentosService } from './orcamentos.service';
// import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';

@Controller('orcamentos')
export class OrcamentosController {
  constructor(private readonly orcamentosService: OrcamentosService) {}

  /**
  @Post()
  create(@Body() createOrcamentoDto: CreateOrcamentoDto) {
    return this.orcamentosService.create(createOrcamentoDto);
  }
  */

  @Get()
  async findAll(@Req() req) {
    return { orcamentos: await this.orcamentosService.findAll(req.user.sub) };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const orcamento = await this.orcamentosService.findOne(+id, req.user.sub);
    if (!orcamento) throw new NotFoundException();
    return orcamento;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrcamentoDto: UpdateOrcamentoDto,
    @Req() req,
  ) {
    return this.orcamentosService.update(+id, updateOrcamentoDto, req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.orcamentosService.remove(+id, req.user.sub);
  }
}
