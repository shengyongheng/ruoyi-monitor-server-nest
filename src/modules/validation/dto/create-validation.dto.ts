import { IsNotEmpty, Max } from 'class-validator';

export class CreateValidationDto {
  @IsNotEmpty()
  username: string;

  @Max(100)
  age: number;
}
