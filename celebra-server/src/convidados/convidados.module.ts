import { Module } from '@nestjs/common';
import { ConvidadosService } from './convidados.service';
import { ConvidadosController } from './convidados.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ConvidadosController],
  providers: [ConvidadosService, PrismaService],
})
export class ConvidadosModule {}
