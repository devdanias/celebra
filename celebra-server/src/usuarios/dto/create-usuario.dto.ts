import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'nome está vazio' })
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'senha está vazia' })
  senha: string;
}
