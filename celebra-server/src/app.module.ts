import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoivosModule } from './noivos/noivos.module';
import { FornecedoresModule } from './fornecedores/fornecedores.module';
import { CasamentosModule } from './casamentos/casamentos.module';
import { ConvidadosModule } from './convidados/convidados.module';
import { OrcamentosModule } from './orcamentos/orcamentos.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NoivosModule,
    FornecedoresModule,
    CasamentosModule,
    ConvidadosModule,
    OrcamentosModule,
    PagamentosModule,
    UsuariosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
