import { HttpExceptionFilter } from './../../common/filters/HttpExceptionFilter';
import {
  HttpException,
  BadRequestException,
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
    // 内置 HttpException 异常
    const customErrorJSON = {
      status: 403,
      message: 'Custom Error',
      code: 10001,
    };
    throw new HttpException(customErrorJSON, HttpStatus.FORBIDDEN);

    // 继承自 HttpException 的异常
    // try {
    //   return 'xxxxx';
    // } catch (error) {
    //   const options: HttpExceptionOptions = {
    //     cause: error,
    //     description: 'Custom Description',
    //   };
    //   throw new CustomException('Custom Error', HttpStatus.FORBIDDEN, options);
    // }

    /**
     *  内置继承自 HttpException 的异常
     *  BadRequestException
        UnauthorizedException
        NotFoundException
        ForbiddenException
        NotAcceptableException
        RequestTimeoutException
        ConflictException
        GoneException
        HttpVersionNotSupportedException
        PayloadTooLargeException
        UnsupportedMediaTypeException
        UnprocessableEntityException
        InternalServerErrorException
        NotImplementedException
        ImATeapotException
        MethodNotAllowedException
        BadGatewayException
        ServiceUnavailableException
        GatewayTimeoutException
        PreconditionFailedException
     */
    throw new BadRequestException('内置继承自 HttpException 的异常', {
      cause: '内置继承自 HttpException 的异常',
      description: 'Some error description',
    });

    throw new Error(
      '异常无法识别 （既不是 HttpException 也不是继承自 HttpException 类）',
    );
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
