import { Injectable } from '@nestjs/common';
import { CreateMonitorErrorDto } from './dto/monitor-error.dto';
import { UpdateMonitorErrorDto } from './dto/update-monitor-error.dto';

@Injectable()
export class MonitorErrorService {
  create(createMonitorErrorDto: CreateMonitorErrorDto) {
    return 'This action adds a new monitorError';
  }

  findAll() {
    return `This action returns all monitorError`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monitorError`;
  }

  update(id: number, updateMonitorErrorDto: UpdateMonitorErrorDto) {
    return `This action updates a #${id} monitorError`;
  }

  remove(id: number) {
    return `This action removes a #${id} monitorError`;
  }
}
