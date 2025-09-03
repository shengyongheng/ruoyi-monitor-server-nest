import { IsString, Length } from 'class-validator';

export class CreatePipeDto {
  @IsString()
  @Length(3, 100, {
    message: '请输入3-100长度之间的名称',
  })
  name: string;
}
