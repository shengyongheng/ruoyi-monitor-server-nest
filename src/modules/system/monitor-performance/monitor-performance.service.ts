import { Injectable } from '@nestjs/common';
import { CreateMonitorPerformanceDto } from './dto/monitor-performance.dto';
import { UpdateMonitorPerformanceDto } from './dto/update-monitor-performance.dto';

@Injectable()
export class MonitorPerformanceService {
  create(createMonitorPerformanceDto: CreateMonitorPerformanceDto) {
    return 'This action adds a new monitorPerformance';
  }

  findAll() {
    return `This action returns all monitorPerformance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monitorPerformance`;
  }

  update(id: number, updateMonitorPerformanceDto: UpdateMonitorPerformanceDto) {
    return `This action updates a #${id} monitorPerformance`;
  }

  remove(id: number) {
    return `This action removes a #${id} monitorPerformance`;
  }
}
