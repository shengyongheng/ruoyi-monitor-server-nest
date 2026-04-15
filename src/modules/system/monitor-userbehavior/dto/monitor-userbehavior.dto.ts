export class UserbehaviorSessionDto {
  sessionId: string;
  username: string;
  type: string;
}

export class UserbehaviorDetailDto extends UserbehaviorSessionDto {}

export class UserbehaviorSessionDetailDto extends UserbehaviorSessionDto {}

export class UserbehaviorTimeLineDto extends UserbehaviorSessionDto {}
