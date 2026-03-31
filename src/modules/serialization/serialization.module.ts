import { Module } from '@nestjs/common';
import { SerializationService } from './serialization.service';
import { SerializationController } from './serialization.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [SerializationController],
  providers: [SerializationService],
  imports: [UserModule],
})
export class SerializationModule {}
