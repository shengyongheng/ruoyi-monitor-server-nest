import { Repository } from 'typeorm';
import { Event, RuoyiMonitorReportDto } from './dto/ruoyi-monitor.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonitorErrorJs } from 'src/modules/system/monitor-error/entities/monitor-error-js.entity';
import { MonitorRrweb } from 'src/modules/system/monitor-error/entities/monitor-rrweb.entity';
import { MonitorErrorRequest } from 'src/modules/system/monitor-error/entities/monitor-error-request.entity';
import { MonitorErrorResource } from 'src/modules/system/monitor-error/entities/monitor-error-resource.entity';
import { MonitorResource } from 'src/modules/system/monitor-resource/entities/monitor-resource.entity';
import { MonitorUserBehavior } from 'src/modules/system/monitor-userbehavior/entities/monitor-userbehavior.entity';
import { MonitorPageStaytime } from 'src/modules/system/monitor-userbehavior/entities/monitor-page-staytime.entity';
import { MonitorRouteChange } from 'src/modules/system/monitor-userbehavior/entities/monitor-route-change.entity';
import { MonitorPerformanceMetric } from 'src/modules/system/monitor-performance/entities/monitor-performance-metric.entity';
import { SysPageloadMetricAgg } from 'src/modules/system/monitor-performance/entities/sys-pageload-metric-agg.entity';
import { SysPerformanceMetricAgg } from 'src/modules/system/monitor-performance/entities/sys-performance-metric-agg.entity';
import { BaseEntity } from 'src/modules/base.entity';
import { ConstantsEnum } from 'src/common/enums/ConstantsEnum';

@Injectable()
export class RuoyiMonitorService {
  constructor(
    // 错误监控
    @InjectRepository(MonitorErrorJs)
    private errorJsRepository: Repository<MonitorErrorJs>,
    @InjectRepository(MonitorRrweb)
    private rrwebRepository: Repository<MonitorRrweb>,
    @InjectRepository(MonitorErrorRequest)
    private errorRequestRepository: Repository<MonitorErrorRequest>,
    @InjectRepository(MonitorErrorResource)
    private errorResourceRepository: Repository<MonitorErrorResource>,

    // 资源监控
    @InjectRepository(MonitorResource)
    private resourceRepository: Repository<MonitorResource>,

    // 用户行为监控
    @InjectRepository(MonitorUserBehavior)
    private userBehaviorRepository: Repository<MonitorUserBehavior>,
    @InjectRepository(MonitorPageStaytime)
    private pageStayTimeRepository: Repository<MonitorPageStaytime>,
    @InjectRepository(MonitorRouteChange)
    private routeChangeRepository: Repository<MonitorRouteChange>,

    // 性能监控
    @InjectRepository(MonitorPerformanceMetric)
    private performanceMetricRepository: Repository<MonitorPerformanceMetric>,
    @InjectRepository(SysPageloadMetricAgg)
    private pageloadMetricAggRepository: Repository<SysPageloadMetricAgg>,
    @InjectRepository(SysPerformanceMetricAgg)
    private performanceMetricAggRepository: Repository<SysPerformanceMetricAgg>,
  ) {}
  async report(ruoyiMonitorReportDto: RuoyiMonitorReportDto) {
    console.log('ruoyiMonitorReportDto:', ruoyiMonitorReportDto);
    const appVersion = ruoyiMonitorReportDto.appVersion;
    const projectKey = ruoyiMonitorReportDto.projectKey;
    const events = ruoyiMonitorReportDto.events;
    for (const event of events) {
      const { eventType, pageView, data } = event;
      const type = data['type'] as unknown as string;
      const baseMonitorEntity = this.getBaseMonitorEntity(
        event,
        eventType,
        projectKey,
        type,
      );
      switch (eventType) {
        case 'vue2': {
          const message = data['message'] as unknown as string;
          const errorType = data['errorType'] as unknown as string;
          const component = data['component'] as unknown as string;
          const file = data['file'] as unknown as string;
          const info = data['info'] as unknown as string;
          break;
        }
        case 'rrweb': {
          const eventsData = data['events'] as unknown as string; // rrweb 事件数据
          const monitorRrweb = this.rrwebRepository.create({
            ...baseMonitorEntity,
            events: eventsData,
          });
          await this.rrwebRepository.save(monitorRrweb);
          break;
        }
        case 'userBehavior': {
          switch (type) {
            // eslint-disable-next-line
            case 'click': {
            }
            // eslint-disable-next-line
            case 'input': {
            }
            // eslint-disable-next-line
            case 'scroll': {
              const description = data['description'] as unknown as string;
              const monitorUserBehavior = this.userBehaviorRepository.create({
                ...baseMonitorEntity,
                description,
              });
              await this.userBehaviorRepository.save(monitorUserBehavior);
              /**
               * 聚合用户行为数据
               */
              await this.aggregateUpdateUsernameAndUserId(
                this.userBehaviorRepository,
                projectKey,
                baseMonitorEntity.sessionId,
                baseMonitorEntity.username,
                baseMonitorEntity.userId,
              );
              break;
            }
            case 'pageStay': {
              const stayTime = Number(data['stayTime']);
              const monitorPageStayTime = this.pageStayTimeRepository.create({
                ...baseMonitorEntity,
                stayTime,
              });
              await this.pageStayTimeRepository.save(monitorPageStayTime);
              /**
               * 聚合页面停留时间数据
               */
              await this.aggregateUpdateUsernameAndUserId(
                this.pageStayTimeRepository,
                projectKey,
                baseMonitorEntity.sessionId,
                baseMonitorEntity.username,
                baseMonitorEntity.userId,
              );
              break;
            }
            // eslint-disable-next-line
            case "history": {
            }
            // eslint-disable-next-line
            case 'hashchange': {
              const trigerType = data['trigerType'] as unknown as string;
              const hashStayTime = data['hashStayTime'] as unknown as string;

              const oldUrl = data['oldUrl'] as unknown as string;
              const newUrl = data['newUrl'] as unknown as string;

              const monitorRouteChange = this.routeChangeRepository.create({
                ...baseMonitorEntity,
                trigerType,
                hashStayTime,
                oldUrl,
                newUrl,
              });
              await this.routeChangeRepository.save(monitorRouteChange);
              /**
               * 聚合路由变化数据
               */
              await this.aggregateUpdateUsernameAndUserId(
                this.routeChangeRepository,
                projectKey,
                baseMonitorEntity.sessionId,
                baseMonitorEntity.username,
                baseMonitorEntity.userId,
              );
              break;
            }
          }
          break;
        }
        case 'errorTracking': {
          switch (type) {
            case 'resource': {
              const tagName = data['tagName'] as unknown as string;
              const src = data['src'] as unknown as string;
              const href = data['href'] as unknown as string;
              const monitorErrorResource = this.errorResourceRepository.create({
                ...baseMonitorEntity,
                tagName,
                src,
                href,
              });
              await this.errorResourceRepository.save(monitorErrorResource);
              /**
               * 聚合错误资源数据
               */
              await this.aggregateUpdateUsernameAndUserId(
                this.errorResourceRepository,
                projectKey,
                baseMonitorEntity.sessionId,
                baseMonitorEntity.username,
                baseMonitorEntity.userId,
              );
              break;
            }
            // eslint-disable-next-line
            case 'js': {
            }
            // eslint-disable-next-line
            case 'promise': {
              const message = data['message'] as unknown as string;
              const filename = data['filename'] as unknown as string;
              const lineno = Number(data['lineno']);
              const colno = Number(data['colno']);
              const stack = data['stack'] as unknown as string;

              const monitorErrorJs = this.errorJsRepository.create({
                ...baseMonitorEntity,
                message,
                filename,
                lineno,
                colno,
                stack,
              });
              await this.errorJsRepository.save(monitorErrorJs);
              /**
               * 聚合 js 错误数据
               */
              await this.aggregateUpdateUsernameAndUserId(
                this.errorJsRepository,
                projectKey,
                baseMonitorEntity.sessionId,
                baseMonitorEntity.username,
                baseMonitorEntity.userId,
              );
              break;
            }
            // eslint-disable-next-line
            case 'ajax': {
            }
            // eslint-disable-next-line
            case 'fetch': {
              const message = data['message'] as unknown as string;
              const url = data['url'] as unknown as string;
              const status = Number(data['status']);
              const duration = Number(data['duration']);
              const method = data['method'] as unknown as string;

              const monitorErrorRequest = this.errorRequestRepository.create({
                ...baseMonitorEntity,
                message,
                url,
                status,
                duration,
                method,
              });
              await this.errorRequestRepository.save(monitorErrorRequest);
              /**
               * 聚合请求错误数据
               */
              await this.aggregateUpdateUsernameAndUserId(
                this.errorRequestRepository,
                projectKey,
                baseMonitorEntity.sessionId,
                baseMonitorEntity.username,
                baseMonitorEntity.userId,
              );
              break;
            }
          }
          break;
        }
        case 'resource': {
          const timing = data['timing'] || {};
          const cached = !!data['cached'];
          const decodedSize = Number(data['decodedSize']);
          const duration = Number(data['duration']);
          const encodedSize = Number(data['encodedSize']);
          const initiatorType = data['initiatorType'] as unknown as string;
          const name = data['name'] as unknown as string;
          const status = data['status'] as unknown as string;
          const transferSize = Number(data['transferSize']);
          const startTime = Number(data['startTime']);
          const dns = Number(timing['dns']);
          const download = Number(timing['download']);
          const tcp = Number(timing['tcp']);
          const ssl = Number(timing['ssl']);
          const monitorResource = this.resourceRepository.create({
            ...baseMonitorEntity,
            type: type,
            encodedSize,
            initiatorType,
            name,
            status,
            startTime,
            cached,
            transferSize,
            dns,
            tcp,
            ssl,
            download,
            duration,
            decodedSize,
          });
          await this.resourceRepository.save(monitorResource);
          /**
           * 聚合资源数据
           */
          await this.aggregateUpdateUsernameAndUserId(
            this.resourceRepository,
            projectKey,
            baseMonitorEntity.sessionId,
            baseMonitorEntity.username,
            baseMonitorEntity.userId,
          );
          break;
        }
        case 'performance': {
          const value = Number(data['value']);
          const monitorPerformanceMetric =
            this.performanceMetricRepository.create({
              ...baseMonitorEntity,
              value,
            });
          await this.performanceMetricRepository.save(monitorPerformanceMetric);
          /**
           *  聚合性能数据
           */
          await this.aggregateUpdateUsernameAndUserId(
            this.performanceMetricRepository,
            projectKey,
            baseMonitorEntity.sessionId,
            baseMonitorEntity.username,
            baseMonitorEntity.userId,
          );
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  /**
   * 聚合逻辑放在后端，检测到某次上报携带 userId 并存在匿名 session，即自动执行聚合补全。
   * | 上报类型    | 是否触发聚合 |
   * | ------- | ------ |
   * | 登录前环境上报 | 否      |
   * | 登录后环境上报 | 是      |
   * | 用户行为上报  | 是      |
   * | JS 错误上报 | 是      |
   * | 性能数据上报  | 是      |
   * | ...  | 是      |
   * 优点：
   *      1.无需前端干预
   *      2.无需侵入被监控业务代码
   *      3.仅依赖后端识别首次登录态事件
   */
  async aggregateUpdateUsernameAndUserId(
    repository: Repository<any>,
    projectKey: string,
    sessionId: string,
    username: string,
    userId: number,
  ) {
    if (
      username != ConstantsEnum.GUEST_USERNAME.valueOf() &&
      userId != ConstantsEnum.GUEST_USERID.valueOf()
    ) {
      const records = await repository.find({
        where: {
          projectKey,
          sessionId: sessionId,
          username: ConstantsEnum.GUEST_USERNAME.valueOf(),
          userId: ConstantsEnum.GUEST_USERID.valueOf(),
        },
      });
      records.forEach(async (item) => {
        // eslint-disable-next-line
        await repository.update(item.id, {
          username,
          userId,
        });
      });
    }
  }

  getBaseMonitorEntity(
    event: Event,
    eventType: string,
    projectKey: string,
    type: string,
  ) {
    const { timestamp, sessionId, userInfo } = event;
    const baseMonitorEntity: Omit<BaseEntity, 'id'> = {
      sessionId: sessionId,
      username: userInfo?.username || '',
      userId: userInfo?.userId,
      eventType: eventType,
      projectKey: projectKey,
      timestamp: timestamp.toString(),
      type: type,
    };
    return baseMonitorEntity;
  }
}
