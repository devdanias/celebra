import {
  IsNotEmpty,
  // IsNumberString,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCasamentoDto {
  @IsNotEmpty()
  dataCasamento: string;

  @IsNotEmpty()
  local: string;

  // @IsNotEmpty()
  // organizadorId: string;
  // fornecedores recebe
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateOrcamentoDto)
  orcamentos: CreateOrcamentoDto[];

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateConviteDto)
  convites: CreateConviteDto[];

  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  noivos: string[];
}

export class CreateOrcamentoDto {
  // @Min(1, { message: '$property deve ser maior que 0' })
  // valor: number;

  // @Min(1, { message: '$property deve ser pelo menos 1' })
  // quantidadeParcelas: number;

  @IsNotEmpty({ message: '$property está vazio' })
  fornecedorId: string;
}

export class CreateConviteDto {
  // @IsNotEmpty({ message: '$property está vazio' })
  // status: string;

  @IsNotEmpty({ message: '$property está vazio' })
  convidadoId: string;
}
