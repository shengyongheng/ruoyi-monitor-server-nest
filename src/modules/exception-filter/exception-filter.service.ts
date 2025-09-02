import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CustomException } from 'src/common/exceptions/customException';
import { CreateExceptionFilterDto } from './dto/create-exception-filter.dto';
import { UpdateExceptionFilterDto } from './dto/update-exception-filter.dto';

@Injectable()
export class ExceptionFilterService {
  create(createExceptionFilterDto: CreateExceptionFilterDto) {
    const options: HttpExceptionOptions = {
      cause: 'Custom Cause',
      description: 'Custom Description',
    };
    throw new CustomException('Custom Error', HttpStatus.FORBIDDEN, options);
  }

  findAll() {
    const customErrorJSON = {
      status: 403,
      message: 'Custom Error',
      code: 10001,
    };
    throw new HttpException(customErrorJSON, HttpStatus.FORBIDDEN);
  }

  findOne(id: number) {
    return `This action returns a #${id} exceptionFilter`;
  }

  update(id: number, updateExceptionFilterDto: UpdateExceptionFilterDto) {
    return `This action updates a #${id} exceptionFilter`;
  }

  remove(id: number) {
    return `This action removes a #${id} exceptionFilter`;
  }
}
