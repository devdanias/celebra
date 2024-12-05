import { Injectable } from '@nestjs/common';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FornecedoresService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createFornecedorDto: CreateFornecedorDto) {
    return this.prismaService.fornecedor.create({ data: createFornecedorDto });
  }

  findAll() {
    return this.prismaService.fornecedor.findMany();
  }

  findOne(id: number) {
    return this.prismaService.fornecedor.findUnique({ where: { id } });
  }

  update(id: number, updateFornecedorDto: UpdateFornecedorDto) {
    return this.prismaService.fornecedor.update({
      where: { id },
      data: updateFornecedorDto,
    });
  }

  remove(id: number) {
    return this.prismaService.fornecedor.delete({ where: { id } });
  }
}
