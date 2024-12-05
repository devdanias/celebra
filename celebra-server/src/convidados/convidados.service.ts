import { Injectable } from '@nestjs/common';
import { CreateConvidadoDto } from './dto/create-convidado.dto';
import { UpdateConvidadoDto } from './dto/update-convidado.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ConvidadosService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createConvidadoDto: CreateConvidadoDto, organizadorId: number) {
    return this.prismaService.convidado.create({
      data: {
        ...createConvidadoDto,
        organizadorId: organizadorId,
      },
    });
  }

  findAll(organizadorId: number) {
    return this.prismaService.convidado.findMany({
      where: { organizadorId },
      include: { convites: true },
    });
  }

  findOne(id: number, organizadorId: number) {
    return this.prismaService.convidado.findUnique({
      where: { id, organizadorId },
    });
  }

  update(
    id: number,
    updateConvidadoDto: UpdateConvidadoDto,
    organizadorId: number,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ...data } = updateConvidadoDto;
    return this.prismaService.convidado.update({
      where: { id, organizadorId },
      data,
    });
  }

  remove(id: number) {
    return this.prismaService.convidado.delete({ where: { id } });
  }
}
