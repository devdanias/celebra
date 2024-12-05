import { PartialType } from '@nestjs/mapped-types';
import { CreateOrcamentoDto } from './create-orcamento.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateOrcamentoDto extends PartialType(CreateOrcamentoDto) {
  @IsNotEmpty({ message: '$propery está vazio' })
  valor?: number;

  @IsNotEmpty({ message: '$propery está vazio' })
  quantidadeParcelas?: number;

  @IsNotEmpty({ message: '$propery está vazio' })
  diaVencimento?: string;
}
