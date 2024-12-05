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
import { FornecedoresService } from './fornecedores.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @Post()
  create(@Body() createFornecedoreDto: CreateFornecedorDto) {
    return this.fornecedoresService.create(createFornecedoreDto);
  }

  @Public()
  @Get()
  async findAll() {
    return { fornecedores: await this.fornecedoresService.findAll() };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vendor = await this.fornecedoresService.findOne(+id);
    if (!vendor) throw new NotFoundException();
    return vendor;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFornecedoreDto: UpdateFornecedorDto,
  ) {
    return this.fornecedoresService.update(+id, updateFornecedoreDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const vendor = await this.fornecedoresService.remove(+id);
    if (!vendor) throw new NotFoundException();
    return vendor;
  }
}
