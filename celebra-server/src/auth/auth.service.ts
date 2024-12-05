import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, _senha: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return null;

    if (!(await argon2.verify(user.senha, _senha))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.nome };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(nome: string, email: string, senha: string) {
    const emailJaRegistrado = await this.usersService.findOneByEmail(email);

    if (emailJaRegistrado) throw new ConflictException('Email ja cadastrado');

    const hashedSenha = await argon2.hash(senha); // verificar depois se precisa de salt

    const user = await this.usersService.create({
      nome,
      email,
      senha: hashedSenha,
    });

    const payload = { sub: user.id, username: user.nome };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
