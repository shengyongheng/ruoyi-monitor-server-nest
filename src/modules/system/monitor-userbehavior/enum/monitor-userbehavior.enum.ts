/**
 * 用户行为事件类型
 */
export enum UserBehaviorTypeEnum {
  Scroll = 'scroll',
  Click = 'click',
  Input = 'input',
}

/**
 * 用户停留时间类型
 */
export enum PageStayTimeTypeEnum {
  PageStay = 'pageStay',
}

/**
 * 路由变化行为类型
 */
export enum RouteChangeTypeEnum {
  History = 'history',
  HashChange = 'hashchange',
}
