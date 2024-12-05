import { IsEmailOrPhoneNumber } from '../../utils';
import { IsNotEmpty } from 'class-validator';

export class CreateConvidadoDto {
  @IsNotEmpty({ message: 'nome está vazio' })
  nome: string;

  @IsEmailOrPhoneNumber()
  contato: string;
}
