import { PartialType } from '@nestjs/swagger';
import { CreateMonitorUserbehaviorDto } from './monitor-userbehavior.dto';

export class UpdateMonitorUserbehaviorDto extends PartialType(CreateMonitorUserbehaviorDto) {}
