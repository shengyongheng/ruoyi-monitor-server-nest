import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitorResource } from './entities/monitor-resource.entity';
import {
  ResourceSessionListVo,
  ResourceStatisticsVo,
} from './vo/monitor-resource.vo';
import { ResourceSessionDto } from './dto/monitor-resource.dto';

@Injectable()
export class MonitorResourceService {
  constructor(
    @InjectRepository(MonitorResource)
    private resourceRepository: Repository<MonitorResource>,
  ) {}

  async resourceStatistics() {
    const monitorResourcesList = await this.resourceRepository.find();
    const resourceStatisticsVo: ResourceStatisticsVo = {
      loadSuccessRate: '0',
      cacheHitRate: '0',
      resourcesNumber: '0',
      avgLoadingTime: '0',
    };
    const resourceNameMap = new Map<string, string>();

    let loadSuccessCount = 0;
    let cacheHitCount = 0;

    for (const monitorResource of monitorResourcesList) {
      if (monitorResource.status === 'success') {
        loadSuccessCount++;
      }
      if (monitorResource.cached) {
        cacheHitCount++;
      }
      if (!resourceNameMap.has(monitorResource.name))
        resourceNameMap.set(monitorResource.name, monitorResource.name);
    }
    resourceStatisticsVo.loadSuccessRate = (
      loadSuccessCount / monitorResourcesList.length
    ).toString();
    resourceStatisticsVo.cacheHitRate = (
      cacheHitCount / monitorResourcesList.length
    ).toString();
    resourceStatisticsVo.resourcesNumber =
      Object.keys(resourceNameMap).length.toString();
    return resourceStatisticsVo;
  }

  async getResourceSessionList() {
    const resourceSessionList = await this.resourceRepository
      .createQueryBuilder('monitor_resource')
      .select('monitor_resource.session_id', 'sessionId')
      .addSelect('monitor_resource.username', 'username')
      .addSelect('COUNT(*)', 'resourceReqs')
      .groupBy('monitor_resource.session_id')
      .addGroupBy('monitor_resource.username')
      .getRawMany<ResourceSessionListVo>();

    return resourceSessionList;
  }
  async getResourceDetailList(resourceSessionDto: ResourceSessionDto) {
    const { sessionId, username } = resourceSessionDto;
    const monitorResources = await this.resourceRepository.find({
      where: {
        sessionId,
        username,
      },
    });
    return monitorResources;
  }
}
