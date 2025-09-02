import { Module } from '@nestjs/common';
import { ExceptionFilterService } from './exception-filter.service';
import { ExceptionFilterController } from './exception-filter.controller';

@Module({
  controllers: [ExceptionFilterController],
  providers: [ExceptionFilterService],
})
export class ExceptionFilterModule {}
