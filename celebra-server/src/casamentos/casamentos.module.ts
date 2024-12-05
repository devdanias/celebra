import { Module } from '@nestjs/common';
import { CasamentosService } from './casamentos.service';
import { CasamentosController } from './casamentos.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CasamentosController],
  providers: [CasamentosService, PrismaService],
})
export class CasamentosModule {}
