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
import { CasamentosService } from './casamentos.service';
import { CreateCasamentoDto } from './dto/create-casamento.dto';
import { UpdateCasamentoDto } from './dto/update-casamento.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('casamentos')
export class CasamentosController {
  constructor(private readonly casamentosService: CasamentosService) {}

  @Post()
  create(@Body() createCasamentoDto: CreateCasamentoDto, @Req() req) {
    // createCasamentoDto.organizadorId = req.user.sub;
    return this.casamentosService.create(createCasamentoDto, req.user.sub);
  }

  // @Public()
  @Get()
  async findAll(@Req() req) {
    return { casamentos: await this.casamentosService.findAll(req.user.sub) };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const casamento = await this.casamentosService.findOne(+id, req.user.sub);
    if (!casamento) throw new NotFoundException();
    return casamento;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCasamentoDto: UpdateCasamentoDto,
    @Req() req,
  ) {
    return this.casamentosService.update(+id, updateCasamentoDto, req.user.sub);
  }

  /**
   * 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casamentosService.remove(+id);
  }
  */

  // implementar /casamentos/orcamentos e /casamentos/convites
  @Get(':id/teste/:id2')
  teste(@Param('id') id: string, @Param('id2') id2: string) {
    return { id, id2 };
  }
}
