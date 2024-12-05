import { Injectable } from '@nestjs/common';
import { CreateCasamentoDto } from './dto/create-casamento.dto';
import { UpdateCasamentoDto } from './dto/update-casamento.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CasamentosService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCasamentoDto: CreateCasamentoDto, organizadorId: number) {
    // return createCasamentoDto;
    const casamento = await this.prismaService.casamento.create({
      data: {
        dataCasamento: new Date(createCasamentoDto.dataCasamento).toISOString(),
        local: createCasamentoDto.local,
        organizadorId,
        orcamentos: {
          create: createCasamentoDto.orcamentos.map((o) => ({
            // valor: o.valor,
            fornecedorId: +o.fornecedorId,
          })),
        },
        convites: {
          create: createCasamentoDto.convites.map((c) => ({
            // ...c,
            convidadoId: +c.convidadoId,
          })),
        },
        noivos: {
          connect: createCasamentoDto.noivos.map((noivoId) => ({
            id: +noivoId,
          })),
        },
      },
      include: { convites: true, noivos: true, orcamentos: true },
    });

    /**
    await Promise.all(
      casamento.orcamentos.map(async (o) => {
        const createdOrcamento = createCasamentoDto.orcamentos.find(
          (or) => +or.fornecedorId === o.fornecedorId,
        );
        // createdOrcamento
        // lembrar de arrumar um jeito de procurar o orcamentoId aqui
        return await this.prismaService.orcamento.update({
          where: { id: o.id },
          data: {
            parcelas: {
              create: this.createParcelas(
                o.id,
                createdOrcamento.quantidadeParcelas,
              ).map((p) => ({ vencimento: p.vencimento })),
            },
          },
        });
      }),
    );
    */

    return casamento;
  }

  findAll(organizadorId: number) {
    return this.prismaService.casamento.findMany({
      where: { organizadorId },
      include: { convites: true, noivos: true, orcamentos: true },
    });
  }

  findOne(id: number, organizadorId: number) {
    return this.prismaService.casamento.findUnique({
      where: { id, organizadorId },
      include: { convites: true, noivos: true, orcamentos: true },
    });
  }

  update(
    id: number,
    updateCasamentoDto: UpdateCasamentoDto,
    organizadorId: number,
  ) {
    // mudar aqui para alterar apenas o local e dataCasamento
    return this.prismaService.casamento.update({
      where: { id, organizadorId },
      data: updateCasamentoDto,
    });
  }

  remove(id: number) {
    // nao permitir apagar
    return this.prismaService.casamento.delete({ where: { id } });
  }

  private createParcelas(orcamentoId: number, quantidadeParcelas: number) {
    const datas: { vencimento: Date; orcamentoId: number }[] = [];
    for (let i = 0; i < quantidadeParcelas; i++) {
      const data = new Date();
      data.setDate(10);
      data.setMonth(data.getMonth() + i);
      datas.push({ vencimento: data, orcamentoId });
    }

    return datas;
  }
}
