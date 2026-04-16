export class ResourceStatisticsVo {
  loadSuccessRate: string;
  cacheHitRate: string;
  resourcesNumber: string;
  avgLoadingTime: string;
}

export class ResourceSessionListVo {
  username: string;
  sessionId: string;
  resourceReqs: number;
}
