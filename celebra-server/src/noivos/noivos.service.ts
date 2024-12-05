import { Injectable } from '@nestjs/common';
import { CreateNoivoDto } from './dto/create-noivo.dto';
import { UpdateNoivoDto } from './dto/update-noivo.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NoivosService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createNoivoDto: CreateNoivoDto, organizadorId: number) {
    return this.prismaService.noivo.create({
      data: { ...createNoivoDto, organizadorId },
    });
  }

  findAll(organizadorId: number) {
    return this.prismaService.noivo.findMany({ where: { organizadorId } });
  }

  findOne(id: number, organizadorId: number) {
    return this.prismaService.noivo.findUnique({
      where: { id, organizadorId },
    });
  }

  update(id: number, updateNoivoDto: UpdateNoivoDto, organizadorId: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = updateNoivoDto;
    return this.prismaService.noivo.update({
      where: { id, organizadorId },
      data,
    });
  }

  remove(id: number) {
    return this.prismaService.noivo.delete({ where: { id } });
  }
}
