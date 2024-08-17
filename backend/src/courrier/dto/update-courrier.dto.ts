import { PartialType } from '@nestjs/mapped-types';
import { CreateCourrierDto } from './create-courrier.dto';

export class UpdateCourrierDto extends PartialType(CreateCourrierDto) {}
