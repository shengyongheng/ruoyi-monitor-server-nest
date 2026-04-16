/**
 * 性能指标
 */
export enum PerformanceMetricEnum {
  LOAD = 'LOAD',
  FPT = 'FPT',
  LCP = 'LCP',
  TTFB = 'TTFB',
  TTI = 'TTI',
  FID = 'FID',
  CLS = 'CLS',
}

/**
 * 页面加载瀑图指标
 */
export enum PageLoadWaterfallMetricEnum {
  TRAN = 'TRAN',
  SSL = 'SSL',
  TCP = 'TCP',
  DOM = 'DOM',
  DNS = 'DNS',
  RES = 'RES',
}

/**
 * 页面加载完成指标
 */
export enum PageLoadMetricEnum {
  DOM = 'DOM',
}
