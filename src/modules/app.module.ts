import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';
// import { databaseConfig } from '../../config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from 'src/common/task/task';
import { RuoyiMonitorModule } from './sdk/ruoyi-monitor/ruoyi-monitor.module';
import { MonitorUserbehaviorModule } from './system/monitor-userbehavior/monitor-userbehavior.module';
import { MonitorPerformanceModule } from './system/monitor-performance/monitor-performance.module';
import { MonitorErrorModule } from './system/monitor-error/monitor-error.module';
import { MonitorResourceModule } from './system/monitor-resource/monitor-resource.module';
import { MonitorEnvironmentModule } from './system/monitor-environment/monitor-environment.module';
import { SysUserModule } from './system/sys-user/sys-user.module';
import { SysMenuModule } from './system/sys-menu/sys-menu.module';
import { SysMenuEntity } from './system/sys-menu/entities/sys-menu.entity';
import { MonitorUserBehavior } from './system/monitor-userbehavior/entities/monitor-userbehavior.entity';
import { MonitorPageStaytime } from './system/monitor-userbehavior/entities/monitor-page-staytime.entity';
import { MonitorRouteChange } from './system/monitor-userbehavior/entities/monitor-route-change.entity';
import { MonitorErrorJs } from './system/monitor-error/entities/monitor-error-js.entity';
import { MonitorRrweb } from './system/monitor-error/entities/monitor-rrweb.entity';
import { MonitorErrorRequest } from './system/monitor-error/entities/monitor-error-request.entity';
import { MonitorErrorResource } from './system/monitor-error/entities/monitor-error-resource.entity';
import { MonitorResource } from './system/monitor-resource/entities/monitor-resource.entity';
import { MonitorPerformanceMetric } from './system/monitor-performance/entities/monitor-performance-metric.entity';
import { SysPageloadMetricAgg } from './system/monitor-performance/entities/sys-pageload-metric-agg.entity';
import { SysPerformanceMetricAgg } from './system/monitor-performance/entities/sys-performance-metric-agg.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      // 分配给 load 属性的值是一个数组，允许您加载多个配置文件（例如 load: [databaseConfig, authConfig] ）
      load: [appConfig],
      isGlobal: true, // 全局使用模块：在根模块（如 AppModule）中加载后，在使用 ConfigService 时就无需在其他模块中重复导入 ConfigModule。
      // 缓存环境变量：由于访问 process.env 可能较慢，您可以通过设置传递给 ConfigModule.forRoot() 的选项对象中的 cache 属性，来提高 ConfigService#get 方法在处理存储在 process.env 中的变量时的性能。
      cache: true,
    }),
    // TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'ruoyi_monitor',
      entities: [
        SysMenuEntity,
        MonitorUserBehavior,
        MonitorPageStaytime,
        MonitorRouteChange,
        MonitorErrorJs,
        MonitorRrweb,
        MonitorErrorRequest,
        MonitorErrorResource,
        MonitorResource,
        MonitorPerformanceMetric,
        SysPageloadMetricAgg,
        SysPerformanceMetricAgg,
      ],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    RuoyiMonitorModule,
    MonitorUserbehaviorModule,
    MonitorPerformanceModule,
    MonitorErrorModule,
    MonitorResourceModule,
    MonitorEnvironmentModule,
    SysUserModule,
    SysMenuModule,
  ],
  providers: [TasksService],
})
export class AppModule {}
