import { ApiProperty } from '@nestjs/swagger';

export class ResourceSessionDto {
  @ApiProperty({ description: '会话ID' })
  sessionId: string;

  @ApiProperty({ description: '用户名' })
  username: string;
}
