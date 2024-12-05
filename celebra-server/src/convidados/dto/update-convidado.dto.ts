import { PartialType } from '@nestjs/mapped-types';
import { CreateConvidadoDto } from './create-convidado.dto';

export class UpdateConvidadoDto extends PartialType(CreateConvidadoDto) {}
