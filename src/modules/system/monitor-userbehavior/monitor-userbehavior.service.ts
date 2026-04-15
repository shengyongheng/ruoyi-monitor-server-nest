import { Injectable } from '@nestjs/common';
import { CreateMonitorUserbehaviorDto } from './dto/monitor-userbehavior.dto';
import { UpdateMonitorUserbehaviorDto } from './dto/update-monitor-userbehavior.dto';

@Injectable()
export class MonitorUserbehaviorService {
  create(createMonitorUserbehaviorDto: CreateMonitorUserbehaviorDto) {
    return 'This action adds a new monitorUserbehavior';
  }

  findAll() {
    return `This action returns all monitorUserbehavior`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monitorUserbehavior`;
  }

  update(id: number, updateMonitorUserbehaviorDto: UpdateMonitorUserbehaviorDto) {
    return `This action updates a #${id} monitorUserbehavior`;
  }

  remove(id: number) {
    return `This action removes a #${id} monitorUserbehavior`;
  }
}
