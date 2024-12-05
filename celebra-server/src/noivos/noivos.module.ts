import { Module } from '@nestjs/common';
import { NoivosService } from './noivos.service';
import { NoivosController } from './noivos.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [NoivosController],
  providers: [NoivosService, PrismaService],
})
export class NoivosModule {}
