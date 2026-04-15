import { Controller, Post, Body } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { CreateValidationDto } from './dto/create-validation.dto';

@Controller('validation')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Post()
  create(@Body() createValidationDto: CreateValidationDto) {
    return this.validationService.create(createValidationDto);
  }
}
