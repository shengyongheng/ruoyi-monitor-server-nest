export class UserBehaviorSessionListVo {
  private username: string;

  private sessionId: string;

  private lastVisit: number;

  private actions: number;

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public setSessionId(sessionId: string): void {
    this.sessionId = sessionId;
  }

  public getLastVisit(): number {
    return this.lastVisit;
  }

  public setLastVisit(lastVisit: number): void {
    this.lastVisit = lastVisit;
  }

  public getActions(): number {
    return this.actions;
  }

  public setActions(actions: number): void {
    this.actions = actions;
  }
}

export class SessionDetailVo {
  private username: string;

  private sessionId: string;

  private durationCN: string; // 停留时间

  private pageViews: number;

  private clicks: number;

  private inputs: number;

  private scrolls: number;

  private startAt: string;

  private endAt: string;

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public setSessionId(sessionId: string): void {
    this.sessionId = sessionId;
  }

  public getDurationCN(): string {
    return this.durationCN;
  }

  public setDurationCN(durationCN: string): void {
    this.durationCN = durationCN;
  }

  public getPageViews(): number {
    return this.pageViews;
  }

  public setPageViews(pageViews: number): void {
    this.pageViews = pageViews;
  }

  public getClicks(): number {
    return this.clicks;
  }

  public setClicks(clicks: number): void {
    this.clicks = clicks;
  }

  public getInputs(): number {
    return this.inputs;
  }

  public setInputs(inputs: number): void {
    this.inputs = inputs;
  }

  public getScrolls(): number {
    return this.scrolls;
  }

  public setScrolls(scrolls: number): void {
    this.scrolls = scrolls;
  }

  public getStartAt(): string {
    return this.startAt;
  }

  public setStartAt(startAt: string): void {
    this.startAt = startAt;
  }

  public getEndAt(): string {
    return this.endAt;
  }

  public setEndAt(endAt: string): void {
    this.endAt = endAt;
  }
}

export class BehaviorTimelineVo {
  private behaviorId: number;
  private behaviorType: string;
  private timestamp: string;
  private description: string;

  public getBehaviorId(): number {
    return this.behaviorId;
  }

  public setBehaviorId(behaviorId: number): void {
    this.behaviorId = behaviorId;
  }

  public getBehaviorType(): string {
    return this.behaviorType;
  }

  public setBehaviorType(behaviorType: string): void {
    this.behaviorType = behaviorType;
  }

  public getTimestamp(): string {
    return this.timestamp;
  }

  public setTimestamp(timestamp: string): void {
    this.timestamp = timestamp;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }
}

export class BehaviorDetailVo {
  private behaviorId: number;
  private behaviorType: string;
  private timestamp: string;
  private description: string;
  private trigerType: string;
  private newUrl: string;
  private oldUrl: string;
  private hashStayTime: string;
  private stayTime: number;

  public getBehaviorId(): number {
    return this.behaviorId;
  }

  public setBehaviorId(behaviorId: number): void {
    this.behaviorId = behaviorId;
  }

  public getBehaviorType(): string {
    return this.behaviorType;
  }

  public setBehaviorType(behaviorType: string): void {
    this.behaviorType = behaviorType;
  }

  public getTimestamp(): string {
    return this.timestamp;
  }

  public setTimestamp(timestamp: string): void {
    this.timestamp = timestamp;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getTrigerType(): string {
    return this.trigerType;
  }

  public setTrigerType(trigerType: string): void {
    this.trigerType = trigerType;
  }

  public getNewUrl(): string {
    return this.newUrl;
  }

  public setNewUrl(newUrl: string): void {
    this.newUrl = newUrl;
  }

  public getOldUrl(): string {
    return this.oldUrl;
  }

  public setOldUrl(oldUrl: string): void {
    this.oldUrl = oldUrl;
  }

  public getHashStayTime(): string {
    return this.hashStayTime;
  }

  public setHashStayTime(hashStayTime: string): void {
    this.hashStayTime = hashStayTime;
  }

  public getStayTime(): number {
    return this.stayTime;
  }

  public setStayTime(stayTime: number): void {
    this.stayTime = stayTime;
  }
}
