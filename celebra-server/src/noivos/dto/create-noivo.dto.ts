import { IsNotEmpty, IsNumberString, IsTaxId } from 'class-validator';
import { IsEmailOrPhoneNumber, IsRg } from '../../utils';

export class CreateNoivoDto {
  @IsNotEmpty({ message: 'nome está vazio' })
  nome: string;

  @IsNotEmpty({ message: 'cpf está vazio' })
  // @IsTaxId('pt-BR', { message: 'cpf está inválido' })
  cpf: string; // validação desativada pra testes

  @IsNotEmpty({ message: 'rg está vazio' })
  // @IsRg({ message: 'rg está inválido' })
  rg: string; // validação desativada pra testes

  @IsNotEmpty({ message: 'endereco está vazio' })
  endereco: string;

  @IsEmailOrPhoneNumber()
  contato: string;
}
