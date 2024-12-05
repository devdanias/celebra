import { PartialType } from '@nestjs/mapped-types';
import { CreateNoivoDto } from './create-noivo.dto';

export class UpdateNoivoDto extends PartialType(CreateNoivoDto) {}
