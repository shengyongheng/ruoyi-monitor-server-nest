import { PartialType } from '@nestjs/swagger';
import { CreateWebsocketDto } from './create-websocket.dto';

export class UpdateWebsocketDto extends PartialType(CreateWebsocketDto) {}
