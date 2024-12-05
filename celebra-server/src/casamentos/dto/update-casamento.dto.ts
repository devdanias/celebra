import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateCasamentoDto } from './create-casamento.dto';

class CasamentoOnlyDto extends PickType(CreateCasamentoDto, [
  'local',
  'dataCasamento',
]) {}

export class UpdateCasamentoDto extends PartialType(CasamentoOnlyDto) {}
