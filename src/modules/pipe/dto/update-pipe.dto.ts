import { PartialType } from '@nestjs/swagger';
import { CreatePipeDto } from './create-pipe.dto';

export class UpdatePipeDto extends PartialType(CreatePipeDto) {}
