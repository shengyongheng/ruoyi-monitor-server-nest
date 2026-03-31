import { PartialType } from '@nestjs/swagger';
import { CreateSerializationDto } from './create-serialization.dto';

export class UpdateSerializationDto extends PartialType(CreateSerializationDto) {}
