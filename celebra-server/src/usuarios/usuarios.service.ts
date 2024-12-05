import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...user } = await this.prismaService.usuario.create({
      data: createUsuarioDto,
    });
    return user;
  }

  async findAll() {
    const users = await this.prismaService.usuario.findMany();
    return users.map((u) => ({
      id: u.id,
      nome: u.nome,
      email: u.email,
      criadoEm: u.criadoEm,
    }));
  }

  async findOne(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...user } = await this.prismaService.usuario.findUnique({
      where: { id },
    });
    return user;
  }

  findOneByEmail(email: string) {
    return this.prismaService.usuario.findFirst({ where: { email } });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...user } = await this.prismaService.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });

    return user;
  }

  async remove(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...user } = await this.prismaService.usuario.delete({
      where: { id },
    });
    return user;
  }
}
