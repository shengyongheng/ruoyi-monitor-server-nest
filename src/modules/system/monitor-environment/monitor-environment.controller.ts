import { Controller } from '@nestjs/common';
import { MonitorEnvironmentService } from './monitor-environment.service';

@Controller('monitor-environment')
export class MonitorEnvironmentController {
  constructor(
    private readonly monitorEnvironmentService: MonitorEnvironmentService,
  ) {}
}
