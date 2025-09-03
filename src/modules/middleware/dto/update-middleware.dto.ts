import { PartialType } from '@nestjs/swagger';
import { CreateMiddlewareDto } from './create-middleware.dto';

export class UpdateMiddlewareDto extends PartialType(CreateMiddlewareDto) {}
