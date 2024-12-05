import { Module } from '@nestjs/common';
import { OrcamentosService } from './orcamentos.service';
import { OrcamentosController } from './orcamentos.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [OrcamentosController],
  providers: [OrcamentosService, PrismaService],
})
export class OrcamentosModule {}
