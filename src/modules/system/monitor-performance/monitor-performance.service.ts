import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MonitorPerformanceMetric } from './entities/monitor-performance-metric.entity';
import { SysPerformanceMetricAgg } from './entities/sys-performance-metric-agg.entity';
import { SysPageloadMetricAgg } from './entities/sys-pageload-metric-agg.entity';
import {
  PageLoadMetricEnum,
  PageLoadWaterfallMetricEnum,
  PerformanceMetricEnum,
} from './enums/monitor-performance.enum';
@Injectable()
export class MonitorPerformanceService {
  constructor(
    @InjectRepository(MonitorPerformanceMetric)
    private performanceMetricRepository: Repository<MonitorPerformanceMetric>,
    @InjectRepository(SysPageloadMetricAgg)
    private pageloadMetricAggRepository: Repository<SysPageloadMetricAgg>,
    @InjectRepository(SysPerformanceMetricAgg)
    private performanceMetricAggRepository: Repository<SysPerformanceMetricAgg>,
  ) {}

  /**
   * 一、什么是分位数（Quantile）
   * Px = 有 x % 的样本值 ≤ 该值
   * P50：中位数（50% 的用户 ≤ 该值）
   * P75：75% 的用户 ≤ 该值
   * P95：最慢的 5% 用户阈值（尾部体验）
   * 在前端监控里：
   * P50 → 典型用户体验
   * P75 → 偏慢用户
   * P95 → 极差体验 / 风险用户
   * @return
   */
  async aggregatePerformanceMetric() {
    for (const type of Object.values(PerformanceMetricEnum)) {
      const typeValueof = type.valueOf();
      const performanceMetricList = await this.performanceMetricRepository.find(
        {
          where: {
            type: typeValueof,
          },
          order: {
            value: 'ASC',
          },
        },
      );
      if (performanceMetricList && performanceMetricList.length > 0) {
        const performanceMetricAgg =
          await this.performanceMetricAggRepository.find({
            where: {
              type: typeValueof,
            },
          });
        // 按 50 分位数 (P50) 计算
        const quantile = 0.5;
        const n = performanceMetricList.length;
        const index = quantile * (n - 1);
        let lower = 0.0;
        let upper = 0.0;
        if (Math.floor(index) - 1 >= 0) {
          lower = performanceMetricList[Math.floor(index) - 1].value;
        }
        if (Math.floor(index) + 1 < n) {
          upper = performanceMetricList[Math.floor(index) + 1].value;
        }
        // 计算 p50 值
        const p50Value =
          performanceMetricList[Math.floor(index)].value +
          (index - Math.floor(index)) * (upper - lower);

        // 创建或更新 SysPerformanceMetricAgg
        const sysPerformanceMetricAgg = new SysPerformanceMetricAgg();
        if (performanceMetricAgg && performanceMetricAgg.length > 0) {
          // 如果存在则更新
          sysPerformanceMetricAgg.id = performanceMetricAgg[0].id;
        }
        sysPerformanceMetricAgg.type = typeValueof;
        sysPerformanceMetricAgg.p50Value = p50Value;

        // 插入或更新，TypeORM save 方法如果有主键则 update，否则 insert
        const saved = await this.performanceMetricAggRepository.save(
          sysPerformanceMetricAgg,
        );
        if (!saved) return false;
      }
    }
    return true;
  }

  // 瀑图数据
  async aggregatePageLoadWaterfallMetrics() {
    const pageLoadMetricList = await this.performanceMetricRepository.find({
      where: {
        type: PageLoadMetricEnum.DOM.valueOf(),
      },
      order: {
        value: 'ASC',
      },
    });
    if (pageLoadMetricList && pageLoadMetricList.length > 0) {
      // 按 50 分位（P50）计算
      const quantile = 0.5;
      const n = pageLoadMetricList.length;
      const index = quantile * (n - 1);
      let lower = 0.0;
      let upper = 0.0;
      if (Math.floor(index) - 1 >= 0) {
        lower = pageLoadMetricList[Math.floor(index) - 1].value;
      }
      if (Math.floor(index) + 1 < n) {
        upper = pageLoadMetricList[Math.floor(index) + 1].value;
      }
      const p50Value =
        pageLoadMetricList[Math.floor(index)].value +
        (index - Math.floor(index)) * (upper - lower);
      /**
       * 从原始数据中“反查样本”
       * 找到 PerformanceMetricConstants.PAGE_LOAD_METRIC 落在 p50Value ± 2% 区间的一次完整记录
       * target = rawSamples.find(
       *    s = > s.total >= p95 * 0.98 && s.total <= p95 * 1.02
       * )
       * 兜底方案：如果 target 不存在则取最近邻样本 |sample.total - p95| 最小
       */
      const targetSample = this.findBestSample(pageLoadMetricList, p50Value);
      const targetSampleSessionId = targetSample?.sessionId;
      // 查找指定 sessionId 下，类型在 PAGE_LOAD_WATERFALL_METRICS 枚举里的数据
      const pageLoadWaterfallTypes = Object.values(PageLoadWaterfallMetricEnum);
      const monitorPerformanceMetrics =
        await this.performanceMetricRepository.find({
          where: {
            sessionId: targetSampleSessionId,
            type: In(pageLoadWaterfallTypes),
          },
          select: ['type', 'value'],
        });
      if (monitorPerformanceMetrics && monitorPerformanceMetrics.length > 0) {
        for (const monitorPerformanceMetric of monitorPerformanceMetrics) {
          const sysPageLoadMetricAgg =
            await this.pageloadMetricAggRepository.findOneBy({
              type: monitorPerformanceMetric.type,
            });
          const sysPageloadMetricAggNew = new SysPageloadMetricAgg();
          if (sysPageLoadMetricAgg) {
            sysPageloadMetricAggNew.id = sysPageLoadMetricAgg.id;
          }
          sysPageloadMetricAggNew.type = monitorPerformanceMetric.type;
          sysPageloadMetricAggNew.p50Value = monitorPerformanceMetric.value;
          return await this.pageloadMetricAggRepository.save(
            sysPageloadMetricAggNew,
          );
        }
      }
      return true;
    }
  }

  /**
   * 规则
   * 方案一（区间命中）：存在 target（total ∈ p50 ± 2%）
   * 方案二（全量最近邻）：在所有样本中找 |total - p50| 最小
   * 最终返回：
   * 若两者都存在 → 比较谁更接近 p50，返回更近的
   * 若方案一不存在 → 返回方案二
   * 若 rawSamples 为空 → 返回 null
   *
   * @param pageLoadMetricList
   * @param p50Value
   * @return
   */
  findBestSample(
    pageLoadMetricList: Array<MonitorPerformanceMetric>,
    p50Value: number,
  ) {
    if (!pageLoadMetricList || pageLoadMetricList.length === 0) {
      return null;
    }
    const lower = p50Value * 0.98;
    const upper = p50Value * 1.02;
    let targetInRange: MonitorPerformanceMetric | null = null;
    let nearestOverall: MonitorPerformanceMetric | null = null;
    let minOverallDiff = Number.MAX_VALUE;

    for (const metric of pageLoadMetricList) {
      const total = metric.value;
      const diff = Math.abs(total - p50Value);

      // 方案二：全量最近邻
      if (diff < minOverallDiff) {
        minOverallDiff = diff;
        nearestOverall = metric;
      }

      // 方案一：区间命中（只取第一个即可）
      if (!targetInRange && total >= lower && total <= upper) {
        targetInRange = metric;
      }
    }

    // 只有方案二
    if (!targetInRange) {
      return nearestOverall;
    }

    // 两种方案都存在 → 比较谁更接近 p50
    const rangeDiff = Math.abs((targetInRange.value ?? 0) - p50Value);
    return rangeDiff <= minOverallDiff ? targetInRange : nearestOverall;
  }

  async getPerformanceMetricAgg() {
    return await this.performanceMetricAggRepository.find();
  }
  async getPageLoadMetricAgg() {
    return await this.pageloadMetricAggRepository.find();
  }
}
