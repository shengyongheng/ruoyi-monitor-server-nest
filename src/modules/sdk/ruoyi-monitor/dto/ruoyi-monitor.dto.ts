import { IsNotEmpty, IsString } from 'class-validator';

export class UserInfo {
  username: string;
  userId: number;
}

export class Event {
  eventType: string;
  sessionId: string;
  pageView: string;
  timestamp: number;
  userInfo: UserInfo;
  data: { [key: string]: object };
}

export class RuoyiMonitorDto {
  @IsString()
  @IsNotEmpty()
  projectKey: string;

  @IsString()
  @IsNotEmpty()
  appVersion: string;

  // TODO 待验证
  events: Array<Event>;
}
