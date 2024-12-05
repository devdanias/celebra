import { IsCNPJ, IsEmailOrPhoneNumber } from '../../utils';
import { IsNotEmpty } from 'class-validator';

export class CreateFornecedorDto {
  @IsNotEmpty({ message: 'nomeFantasia está vazio' })
  nomeFantasia: string;

  @IsNotEmpty({ message: 'cnpj está vazio' })
  // @IsCNPJ()
  cnpj: string; // desativado pra testes

  @IsNotEmpty({ message: 'nenhum tipo definido' })
  tipo: string;

  @IsEmailOrPhoneNumber()
  contato: string;

  // orcamentos ?
}
