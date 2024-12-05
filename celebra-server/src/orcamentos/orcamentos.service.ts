import { Injectable } from '@nestjs/common';
// import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class OrcamentosService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
  create(createOrcamentoDto: CreateOrcamentoDto) {
    return '';
  }
  */

  async findAll(organizadorId: number) {
    const orcamentos = await this.prismaService.orcamento.findMany({
      where: { casamento: { organizadorId } },
      include: { casamento: true, fornecedor: true, parcelas: true },
    });

    return orcamentos;
  }

  async findOne(id: number, organizadorId: number) {
    const orcamento = await this.prismaService.orcamento.findUnique({
      where: { id, casamento: { organizadorId } },
    });

    return orcamento;
  }

  async update(
    id: number,
    updateOrcamentoDto: UpdateOrcamentoDto,
    organizadorId: number,
  ) {
    const where = { id, casamento: { organizadorId } };

    if (updateOrcamentoDto.valor) {
      return await this.prismaService.orcamento.update({
        where,
        data: { valor: updateOrcamentoDto.valor },
      });
    }

    if (updateOrcamentoDto.diaVencimento) {
      const data = new Date();
      data.setDate(+updateOrcamentoDto.diaVencimento);

      if (process.env.PRIMEIRA_PARCELA_VENCIDA) {
        const dataHoje = new Date();

        if (dataHoje.getMilliseconds() < data.getMilliseconds()) {
          data.setMonth(data.getMonth() - 1);
        }
      } else {
        const dataHoje = new Date();

        if (dataHoje.getUTCMilliseconds() > data.getMilliseconds()) {
          data.setMonth(data.getMonth() + 1);
        }
      }

      const orcamentos = await this.prismaService.parcela.updateMany({
        where: { orcamentoId: id },
        data: { vencimento: data.toISOString() },
      });

      return orcamentos;
    }

    const orcamento = await this.prismaService.orcamento.update({
      where,
      data: updateOrcamentoDto,
    });

    return orcamento;
  }

  async remove(id: number, organizadorId: number) {
    const orcamento = await this.prismaService.orcamento.delete({
      where: { id, casamento: { organizadorId } },
    });

    return orcamento;
  }
}
